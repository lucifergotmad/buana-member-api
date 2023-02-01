import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface ITukarPoinProps {
  is_online: boolean;
}

export class TukarPoinEntity extends AggregateRoot<ITukarPoinProps> {
  constructor(props: ITukarPoinProps) {
    super(props);
  }

  static create(props: ITukarPoinProps) {
    return new TukarPoinEntity(props);
  }
}
