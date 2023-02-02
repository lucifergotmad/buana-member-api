import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { AddHadiahRequestDTO } from "../controller/dtos/add-hadiah.request.dto";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";
import { HadiahEntity } from "../domain/hadiah.entity";

@Injectable()
export class AddHadiah
  extends BaseUseCase
  implements IUseCase<AddHadiahRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(request?: AddHadiahRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;
      await session.withTransaction(async () => {
        const hadiah = await this.hadiahRepository.findOne({
          kode_hadiah: request.kode_hadiah,
          status_active: true,
        });

        if (hadiah) {
          if (!hadiah.status_active) {
            await this.hadiahRepository.update(
              { kode_hadiah: request.kode_hadiah },
              { status_active: true, updated_by: this?.user?.user_id },
            );
          } else {
            throw new BadRequestException("Data hadiah already exists!");
          }
        } else {
          const hadiahEntity = HadiahEntity.create({
            kode_hadiah: request.kode_hadiah,
            nama_hadiah: request.nama_hadiah,
            poin_hadiah: request.poin_hadiah,
            stock_hadiah: 0,
            status_active: true,
            created_by: this?.user?.user_id,
            is_online: false,
          });

          result = await this.hadiahRepository.save(hadiahEntity, session);
        }
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
