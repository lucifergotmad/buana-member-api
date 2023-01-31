import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { StockHadiahCardEntity } from "../../domain/stock-hadiah-card.entity";
import { StockHadiahCardMongoEntity } from "./stock-hadiah-card.mongo-entity";

export class StockHadiahCardMongoMapper extends DbMapper<
  StockHadiahCardEntity,
  StockHadiahCardMongoEntity
> {
  protected toMongoProps(
    entity: StockHadiahCardEntity,
  ): MongoEntityProps<StockHadiahCardMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<StockHadiahCardMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
