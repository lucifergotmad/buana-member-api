import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { TambahHadiahEntity } from "../../domain/tambah-hadiah.entity";
import { TambahHadiahMongoEntity } from "./tambah-hadiah.mongo-entity";

export class TambahHadiahMongoMapper extends DbMapper<
  TambahHadiahEntity,
  TambahHadiahMongoEntity
> {
  protected toMongoProps(
    entity: TambahHadiahEntity,
  ): MongoEntityProps<TambahHadiahMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<TambahHadiahMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
