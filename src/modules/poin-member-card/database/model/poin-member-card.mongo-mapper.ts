import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { PoinMemberCardEntity } from "../../domain/poin-member-card.entity";
import { PoinMemberCardMongoEntity } from "./poin-member-card.mongo-entity";

export class PoinMemberCardMongoMapper extends DbMapper<
  PoinMemberCardEntity,
  PoinMemberCardMongoEntity
> {
  protected toMongoProps(
    entity: PoinMemberCardEntity,
  ): MongoEntityProps<PoinMemberCardMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<PoinMemberCardMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
