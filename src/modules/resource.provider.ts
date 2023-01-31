import { AppAuthModule } from "./app/app-auth.module";
import { HadiahModule } from "./hadiah/hadiah.module";
import { MemberModule } from "./member/member.module";
import { StockHadiahCardModule } from "./stock-hadiah-card/stock-hadiah-card.module";
import { TambahHadiahModule } from "./tambah-hadiah/tambah-hadiah.module";
import { UserModule } from "./user/user.module";

const systemProviders = [
  AppAuthModule,
  UserModule,
  MemberModule,
  HadiahModule,
  TambahHadiahModule,
  StockHadiahCardModule,
];

export const resourceProviders = [...systemProviders];
