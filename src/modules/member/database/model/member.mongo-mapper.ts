import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { MemberEntity } from "../../domain/member.entity";
import { MemberMongoEntity } from "./member.mongo-entity";

export class MemberMongoMapper extends DbMapper<
  MemberEntity,
  MemberMongoEntity
> {
  protected toMongoProps(
    entity: MemberEntity,
  ): MongoEntityProps<MemberMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<MemberMongoEntity> = {
      ...props,
      jenis_kelamin: props.jenis_kelamin.value,
      email: props?.email.value,
      status: props.status.value,
      no_identitas: props.no_identitas.value,
      no_hp: props.no_hp.value,
      emergency_number: props?.emergency_number.value,
      telp_rumah: props?.telp_rumah.value,
      telp_kantor: props?.telp_kantor.value,
      agama: props?.agama.value,
      rt_rw: props.rt_rw.value,
      pendidikan: props?.pendidikan.value,
    };
    return mongoProps;
  }
}
