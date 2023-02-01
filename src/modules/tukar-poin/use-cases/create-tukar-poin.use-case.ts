import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
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
      });

      return new MessageResponseDTO("Success tukar poin!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
