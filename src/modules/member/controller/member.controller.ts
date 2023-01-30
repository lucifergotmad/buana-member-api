import { Post } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor() {}
}
