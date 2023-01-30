import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface IMemberProps {
  is_online: boolean;
}

export class MemberEntity extends AggregateRoot<IMemberProps> {
  constructor(props: IMemberProps) {
    super(props);
  }

  static create(props: IMemberProps) {
    return new MemberEntity(props);
  }
}
