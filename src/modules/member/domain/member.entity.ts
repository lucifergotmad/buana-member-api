import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface MemberProps {
  // put field interface here
  name: string;
}

export class MemberEntity extends AggregateRoot<MemberProps> {
  constructor(props: MemberProps) {
    super(props);
  }

  static create(props: MemberProps) {
    return new MemberEntity(props);
  }
}
