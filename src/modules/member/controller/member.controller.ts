import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";

@ControllerProperty("v1/members", "Members")
export class MemberController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
