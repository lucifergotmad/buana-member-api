import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreatePoinMemberCard } from "src/modules/poin-member-card/use-cases/create-poin-member-card.use-case";
import { CreateMemberRequestDTO } from "../controller/dtos/create-member.request.dto";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberEntity } from "../domain/member.entity";

@Injectable()
export class CreateMember
  extends BaseUseCase
  implements IUseCase<CreateMemberRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly createPoinMemberCard: CreatePoinMemberCard,
    private utils: Utils,
  ) {
    super();
  }

  async execute(request?: CreateMemberRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;

      await session.withTransaction(async () => {
        const isExists = await this.memberRepository.findOne(
          { no_identitas: request.no_identitas },
          session,
        );
        if (isExists) {
          if (!isExists.status_active) {
            result = await this.memberRepository.update(
              { no_identitas: request.no_identitas },
              { status_active: true, created_by: this?.user?.user_id },
            );
          } else {
            throw new BadRequestException("No identitas telah digunakan!");
          }
        } else {
          const kodeMember = await this.utils.generator.generateKodeMember();
          const memberEntity = MemberEntity.create({
            kode_member: kodeMember,
            no_identitas: request.no_identitas,
            tanggal_daftar: request.tanggal_daftar,
            tanggal_valid: request.tanggal_valid,
            nama_lengkap: request.nama_lengkap,
            nama_depan: request?.nama_depan,
            nama_belakang: request?.nama_belakang,
            tanggal_lahir: request.tanggal_lahir,
            tempat_lahir: request.tempat_lahir,
            alamat: request.alamat,
            rt_rw: request.rt_rw,
            kelurahan: request.kelurahan,
            kota: request.kota,
            no_hp: request.no_hp,
            kode_pos: request?.kode_pos,
            domisili: request?.domisili,
            status: request?.status,
            agama: request?.agama,
            pendidikan: request?.pendidikan,
            penghasilan: request?.penghasilan,
            pengeluaran: request?.pengeluaran,
            jumlah_anak_pria: request?.jumlah_anak_pria,
            jumlah_anak_wanita: request?.jumlah_anak_wanita,
            pekerjaan: request?.pekerjaan,
            nama_perusahaan: request?.nama_perusahaan,
            alamat_perusahaan: request?.alamat_perusahaan,
            kota_perusahaan: request?.kota_perusahaan,
            bidang_usaha: request?.bidang_usaha,
            emergency_number: request?.emergency_number,
            jenis_kelamin: request?.jenis_kelamin,
            terima_sms: request?.terima_sms,
            telp_rumah: request?.telp_rumah,
            telp_kantor: request?.telp_kantor,
            email: request?.email,
            terima_email: request?.terima_email,
            poin: 0,
            created_by: this?.user?.user_id,
            status_active: true,
            is_online: false,
          });

          result = await this.memberRepository.save(memberEntity, session);
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
