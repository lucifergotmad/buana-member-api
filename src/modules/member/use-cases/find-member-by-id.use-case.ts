import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { MemberResponseDTO } from "../controller/dtos/member.response.dto";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { InjectMemberRepository } from "../database/member.repository.provider";

@Injectable()
export class FindMemberById
  extends BaseUseCase
  implements IUseCase<IId, MemberResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
  ) {
    super();
  }

  async execute({ _id }: IId): Promise<MemberResponseDTO> {
    try {
      const result = await this.memberRepository.findById(_id);
      return new MemberResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
