import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { TukarPoinEntity } from "../../domain/tukar-poin.entity";
import { TukarPoinMongoEntity } from "./tukar-poin.mongo-entity";

export class TukarPoinMongoMapper extends DbMapper<
  TukarPoinEntity,
  TukarPoinMongoEntity
> {
  protected toMongoProps(
    entity: TukarPoinEntity,
  ): MongoEntityProps<TukarPoinMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<TukarPoinMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
