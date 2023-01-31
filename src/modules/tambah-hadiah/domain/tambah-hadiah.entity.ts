import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface ITambahHadiahProps {
  is_online: boolean;
}

export class TambahHadiahEntity extends AggregateRoot<ITambahHadiahProps> {
  constructor(props: ITambahHadiahProps) {
    super(props);
  }

  static create(props: ITambahHadiahProps) {
    return new TambahHadiahEntity(props);
  }
}
