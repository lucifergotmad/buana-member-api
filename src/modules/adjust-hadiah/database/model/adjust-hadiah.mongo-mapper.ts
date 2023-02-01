import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { AdjustHadiahEntity } from "../../domain/adjust-hadiah.entity";
import { AdjustHadiahMongoEntity } from "./adjust-hadiah.mongo-entity";

export class AdjustHadiahMongoMapper extends DbMapper<
  AdjustHadiahEntity,
  AdjustHadiahMongoEntity
> {
  protected toMongoProps(
    entity: AdjustHadiahEntity,
  ): MongoEntityProps<AdjustHadiahMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<AdjustHadiahMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
