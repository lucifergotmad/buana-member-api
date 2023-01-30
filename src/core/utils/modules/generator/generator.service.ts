import { Injectable } from "@nestjs/common";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { IGeneratorUtil } from "./generator.interface";

@Injectable()
export class GeneratorUtil implements IGeneratorUtil {
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
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
