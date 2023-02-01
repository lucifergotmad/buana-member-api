import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { InjectMemberRepository } from "../database/member.repository.provider";

@Injectable()
export class DeleteMember
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute({ _id }: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;

      await session.withTransaction(async () => {
        result = await this.memberRepository.update(
          { _id, status_active: true },
          {
            status_active: false,
            updated_by: this.user?.username,
            updated_at: new Date(),
          },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
