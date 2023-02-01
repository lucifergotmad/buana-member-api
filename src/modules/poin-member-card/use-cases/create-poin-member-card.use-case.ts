import { Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { CreatePoinMemberCardRequestDTO } from "../controller/dtos/create-poin-member-card.request.dto";
import { PoinMemberCardRepositoryPort } from "../database/poin-member-card.repository.port";
import { InjectPoinMemberCardRepository } from "../database/poin-member-card.repository.provider";
import { PoinMemberCardEntity } from "../domain/poin-member-card.entity";

@Injectable()
export class CreatePoinMemberCard
  extends BaseUseCase
  implements IUseCase<CreatePoinMemberCardRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectPoinMemberCardRepository
    private readonly poinMemberCardRepository: PoinMemberCardRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: CreatePoinMemberCardRequestDTO,
    session?: ClientSession,
  ): Promise<MessageResponseDTO> {
    try {
      const latestPoin = await this.poinMemberCardRepository.findOneLatest({
        kode_member: request.kode_member,
      });

      const awalPoin = latestPoin ? latestPoin.poin_akhir : 0;
      const akhirPoin = !request.poin_keluar
        ? awalPoin - request.poin_keluar
        : awalPoin + request.poin_masuk;

      await this.poinMemberCardRepository.update(
        {
          kode_member: request.kode_member,
        },
        {
          $inc: {
            poin_awal:
              !request.poin_keluar || request.poin_masuk
                ? awalPoin
                : awalPoin * -1,
            poin_akhir:
              !request.poin_keluar || request.poin_masuk
                ? akhirPoin
                : akhirPoin * -1,
          },
        },
        session,
      );

      const poinMemberCardEntity = PoinMemberCardEntity.create({
        kode_member: request.kode_member,
        tanggal: request.tanggal,
        created_by: this?.user?.username,
        kategori: request.kategori,
        no_referensi: request.no_transaksi,
        poin_akhir: akhirPoin,
        poin_awal: awalPoin,
        poin_keluar: request.poin_keluar,
        poin_masuk: request.poin_masuk,
        is_online: false,
      });

      await this.poinMemberCardRepository.save(poinMemberCardEntity, session);

      return new MessageResponseDTO("Success add to Poin Member Card");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
