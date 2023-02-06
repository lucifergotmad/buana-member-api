import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { CheckPoinMemberRequestDTO } from "../controller/dtos/check-poin-member.request.dto";
import { CheckPoinMemberResponseDTO } from "../controller/dtos/check-poin-member.response.dto";

@Injectable()
export class CheckPoinMember
  extends BaseUseCase
  implements IUseCase<CheckPoinMemberRequestDTO, CheckPoinMemberResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: CheckPoinMemberRequestDTO,
  ): Promise<CheckPoinMemberResponseDTO> {
    try {
      if (!request.kode_member) {
        throw new BadRequestException("Kode member mesti di isi!");
      }

      const result = await this.memberRepository.findOneOrThrow(
        { kode_member: request.kode_member },
        "Member tidak dapat ditemukan!",
      );

      return new CheckPoinMemberResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
