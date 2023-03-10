import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { AdjustHadiahRepositoryPort } from "src/modules/adjust-hadiah/database/adjust-hadiah.repository.port";
import { InjectAdjustHadiahRepository } from "src/modules/adjust-hadiah/database/adjust-hadiah.repository.provider";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { TambahHadiahRepositoryPort } from "src/modules/tambah-hadiah/database/tambah-hadiah.repository.port";
import { InjectTambahHadiahRepository } from "src/modules/tambah-hadiah/database/tambah-hadiah.repository.provider";
import { TukarPoinRepositoryPort } from "src/modules/tukar-poin/database/tukar-poin.repository.port";
import { InjectTukarPoinRepository } from "src/modules/tukar-poin/database/tukar-poin.repository.provider";
import { IGeneratorUtil } from "./generator.interface";

@Injectable()
export class GeneratorUtil implements IGeneratorUtil {
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    @InjectTambahHadiahRepository
    private readonly tambahHadiahRepository: TambahHadiahRepositoryPort,
    @InjectAdjustHadiahRepository
    private readonly adjustHadiahRepository: AdjustHadiahRepositoryPort,
    @InjectTukarPoinRepository
    private readonly tukarPoinRepository: TukarPoinRepositoryPort,
  ) {}

  async generateKodeMember(): Promise<string> {
    let kodeMember: string;
    const latestKodeMember = await this.memberRepository.findOneLatest({});

    if (!latestKodeMember) {
      kodeMember = "PLG0000001";
    } else {
      kodeMember =
        latestKodeMember.kode_member.substring(0, 3) +
        String(
          Number(
            latestKodeMember.kode_member.slice(
              3,
              latestKodeMember.kode_member.length,
            ),
          ) + 1,
        ).padStart(7, "0");
    }

    return kodeMember;
  }

  async generateNoTransaksi(type: string, date: string): Promise<string> {
    let noTransaksi: string;
    let latestNoTransaksi: string | null;

    switch (type) {
      case TipeTransaksi.TambahStockHadiah:
        const tambahHadiah = await this.tambahHadiahRepository.findOneLatest({
          no_tambah_hadiah: new RegExp(`${date}`),
        });
        latestNoTransaksi = tambahHadiah?.no_tambah_hadiah ?? null;

        break;
      case TipeTransaksi.AdjustStockHadiah:
        const adjustHadiah = await this.adjustHadiahRepository.findOneLatest({
          no_adjust_hadiah: new RegExp(`${date}`),
        });

        latestNoTransaksi = adjustHadiah?.no_adjust_hadiah ?? null;
        break;
      case TipeTransaksi.TukarPoin:
        const tukarPoin = await this.tukarPoinRepository.findOneLatest({
          no_tukar_poin: new RegExp(`${date}`),
        });

        latestNoTransaksi = tukarPoin?.no_tukar_poin ?? null;
        break;
      default:
        throw new UnprocessableEntityException(
          "Invalid tipe transaksi when generate No Transaksi!",
        );
    }
    const prefix = this._generatePrefix(type);

    if (!latestNoTransaksi) {
      noTransaksi = `${prefix}-${date}-0001`;
    } else {
      noTransaksi =
        latestNoTransaksi.substring(0, 11) +
        String(
          Number(latestNoTransaksi.slice(11, latestNoTransaksi.length)) + 1,
        ).padStart(4, "0");
    }

    return noTransaksi;
  }

  private _generatePrefix(type: string) {
    let prefix: string;

    switch (type) {
      case TipeTransaksi.TambahStockHadiah:
        prefix = "TSH";
        break;
      case TipeTransaksi.AdjustStockHadiah:
        prefix = "ASH";
        break;
      case TipeTransaksi.TukarPoin:
        prefix = "TPM";
        break;
      default:
        throw new UnprocessableEntityException(
          "Invalid tipe transaksi when generate Prefix!",
        );
    }

    return prefix;
  }

  generateRandomString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
