import { OmitType } from "@nestjs/swagger";
import { AddHadiahRequestDTO } from "./add-hadiah.request.dto";

export class UpdateHadiahRequestDTO extends OmitType(AddHadiahRequestDTO, [
  "kode_hadiah",
]) {}
