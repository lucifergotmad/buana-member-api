import { AdjustHadiahModule } from "./adjust-hadiah/adjust-hadiah.module";
import { AppAuthModule } from "./app/app-auth.module";
import { HadiahModule } from "./hadiah/hadiah.module";
import { MemberModule } from "./member/member.module";
import { PoinMemberCardModule } from "./poin-member-card/poin-member-card.module";
import { StockHadiahCardModule } from "./stock-hadiah-card/stock-hadiah-card.module";
import { TambahHadiahModule } from "./tambah-hadiah/tambah-hadiah.module";
import { TukarPoinModule } from "./tukar-poin/tukar-poin.module";
import { UserModule } from "./user/user.module";

const systemProviders = [
  AppAuthModule,
  UserModule,
  MemberModule,
  HadiahModule,
  TambahHadiahModule,
  AdjustHadiahModule,
  TukarPoinModule,
  PoinMemberCardModule,
  StockHadiahCardModule,
];

export const resourceProviders = [...systemProviders];
