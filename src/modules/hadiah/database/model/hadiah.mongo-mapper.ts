import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { HadiahEntity } from "../../domain/hadiah.entity";
import { HadiahMongoEntity } from "./hadiah.mongo-entity";

export class HadiahMongoMapper extends DbMapper<
  HadiahEntity,
  HadiahMongoEntity
> {
  protected toMongoProps(
    entity: HadiahEntity,
  ): MongoEntityProps<HadiahMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<HadiahMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
