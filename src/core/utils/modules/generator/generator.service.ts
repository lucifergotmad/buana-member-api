import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { TambahHadiahRepositoryPort } from "src/modules/tambah-hadiah/database/tambah-hadiah.repository.port";
import { InjectTambahHadiahRepository } from "src/modules/tambah-hadiah/database/tambah-hadiah.repository.provider";
import { IGeneratorUtil } from "./generator.interface";

@Injectable()
export class GeneratorUtil implements IGeneratorUtil {
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    @InjectTambahHadiahRepository
    private readonly tambahHadiahRepository: TambahHadiahRepositoryPort,
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
    let latestNoTransaksi: string;

    switch (type) {
      case TipeTransaksi.TambahStockHadiah:
        const transaksi = await this.tambahHadiahRepository.findOneLatest({
          no_tambah_hadiah: new RegExp(`${date}`),
        });

        latestNoTransaksi = transaksi?.no_tambah_hadiah ?? null;
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
        ).padStart(7, "0");
    }

    return noTransaksi;
  }

  private _generatePrefix(type: string) {
    let prefix: string;

    switch (type) {
      case TipeTransaksi.TambahStockHadiah:
        prefix = "TSH";
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
