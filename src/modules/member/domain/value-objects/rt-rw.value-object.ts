import { UnprocessableEntityException } from "@nestjs/common";
import { ValueObject } from "src/core/base-classes/domain/value-object";
import { DomainPrimitive } from "src/core/base-classes/types/domain-primitive.type";
import { Guard } from "src/core/logic/guard";

export class RtRw extends ValueObject<string> {
  constructor(value: string, optional = false) {
    super({ value }, optional);
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (value) {
      if (!Guard.isValidRTRW(value)) {
        throw new UnprocessableEntityException("RT RW tidak valid!");
      }
    }
  }
}
