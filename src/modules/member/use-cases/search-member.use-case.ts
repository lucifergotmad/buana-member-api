import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MemberResponseDTO } from "../controller/dtos/member.response.dto";
import { SearchMemberRequestDTO } from "../controller/dtos/search-member.request.dto";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberMongoEntity } from "../database/model/member.mongo-entity";

@Injectable()
export class SearchMember
  extends BaseUseCase
  implements IUseCase<SearchMemberRequestDTO, MemberResponseDTO[]>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: SearchMemberRequestDTO,
  ): Promise<MemberResponseDTO[]> {
    try {
      const result = await this.memberRepository.findBySorted({
        $and: [
          this._setOptionNama(request?.nama_member),
          this._setOptionKode(request?.kode_member),
          this._setOptionNIK(request?.no_identitas),
          this._setOptionTglLahir(request?.tanggal_lahir),
          this._setOptionAlamat(request?.alamat),
          this._setOptionNoHP(request?.no_hp),
        ],
      });

      return result.map(
        (member: MemberMongoEntity) => new MemberResponseDTO(member),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _setOptionKode(kode_member: string) {
    return kode_member ? { kode_member } : {};
  }

  private _setOptionNIK(no_identitas: string) {
    return no_identitas ? { no_identitas } : {};
  }

  private _setOptionTglLahir(tanggal_lahir: string) {
    return tanggal_lahir ? { tanggal_lahir } : {};
  }

  private _setOptionNoHP(no_hp: string) {
    return no_hp ? { no_hp } : {};
  }

  private _setOptionAlamat(alamat: string) {
    return alamat
      ? { alamat: new RegExp(`/^(.*?(\b${alamat}\b)[^$]*)$/`) }
      : {};
  }

  private _setOptionNama(nama_member: string) {
    return nama_member
      ? { nama_lengkap: new RegExp(`/^(.*?(\b${nama_member}\b)[^$]*)$/`) }
      : {};
  }
}
