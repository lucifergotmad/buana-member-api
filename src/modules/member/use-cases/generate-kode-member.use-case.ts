import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { GenerateKodeMemberResponseDTO } from "../controller/dtos/generate-kode-member.response";

@Injectable()
export class GenerateKodeMember
  extends BaseUseCase
  implements IUseCase<never, GenerateKodeMemberResponseDTO>
{
  constructor(private readonly utils: Utils) {
    super();
  }

  async execute(_?: never): Promise<GenerateKodeMemberResponseDTO> {
    try {
      const kodeMember = await this.utils.generator.generateKodeMember();

      return new GenerateKodeMemberResponseDTO({ kode_member: kodeMember });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
