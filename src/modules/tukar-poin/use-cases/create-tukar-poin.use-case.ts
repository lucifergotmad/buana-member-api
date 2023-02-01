import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { HadiahRepositoryPort } from "src/modules/hadiah/database/hadiah.repository.port";
import { InjectHadiahRepository } from "src/modules/hadiah/database/hadiah.repository.provider";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { CreatePoinMemberCard } from "src/modules/poin-member-card/use-cases/create-poin-member-card.use-case";
import { CreateTukarPoinRequestDTO } from "../controller/dtos/create-tukar-poin.request.dto";
import { TukarPoinRepositoryPort } from "../database/tukar-poin.repository.port";
import { InjectTukarPoinRepository } from "../database/tukar-poin.repository.provider";
import { TukarPoinEntity } from "../domain/tukar-poin.entity";

@Injectable()
export class CreateTukarPoin
  extends BaseUseCase
  implements IUseCase<CreateTukarPoinRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectTukarPoinRepository
    private readonly tukarPoinRepository: TukarPoinRepositoryPort,
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly createPoinMemberCard: CreatePoinMemberCard,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    request?: CreateTukarPoinRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      await session.withTransaction(async () => {
        const date = new Date();

        const noTukarPoin = await this.utils.generator.generateNoTransaksi(
          TipeTransaksi.TukarPoin,
          this.utils.date.formatDate(date, "YYMMDD"),
        );

        const member = await this.memberRepository.findOneOrThrow(
          { kode_member: request.kode_member },
          "Data Member tidak ditemukan!",
        );
        const hadiah = await this.hadiahRepository.findOneOrThrow(
          { kode_hadiah: request.kode_hadiah },
          "Data Hadiah Tidak Ditemukan",
        );

        const tukarPoinEntity = TukarPoinEntity.create({
          no_tukar_poin: noTukarPoin,
          tanggal: this.utils.date.localDateString(date),
          kode_member: request.kode_member,
          kode_hadiah: request.kode_hadiah,
          jumlah: request.jumlah,
          created_by: this?.user.username,
          is_online: false,
        });

        await this.tukarPoinRepository.save(tukarPoinEntity, session);

        const poinKeluar = await this._definePoinKeluar(
          hadiah.poin_hadiah,
          request.jumlah,
        );

        if (member.poin < poinKeluar) {
          throw new BadRequestException(
            "Poin member Kurang untuk melakukan transaksi!",
          );
        }

        await this.createPoinMemberCard.injectDecodedToken(this?.user).execute({
          no_transaksi: noTukarPoin,
          tanggal: this.utils.date.localDateString(date),
          kategori: TipeTransaksi.TukarPoin,
          kode_hadiah: request.kode_hadiah,
          kode_member: request.kode_member,
          poin_keluar: poinKeluar,
          poin_masuk: 0,
        });
      });

      return new MessageResponseDTO("Success tukar poin!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }

  private async _definePoinKeluar(
    poin_hadiah = 0,
    jumlah = 0,
  ): Promise<number> {
    return poin_hadiah ? poin_hadiah * jumlah : 0;
  }
}
