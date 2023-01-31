import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { UpdateMemberRequestDTO } from "../controller/dtos/update-member.request.dto";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberMongoEntity } from "../database/model/member.mongo-entity";

@Injectable()
export class UpdateMember
  extends BaseUseCase
  implements IUseCase<IId & UpdateMemberRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    request?: IId & UpdateMemberRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;
      await session.withTransaction(async () => {
        const payload: Partial<MemberMongoEntity> = request;
        result = await this.memberRepository.update(
          { _id: request._id },
          { ...payload, updated_by: this.user?.username },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
