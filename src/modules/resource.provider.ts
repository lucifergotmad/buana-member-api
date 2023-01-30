import { AppAuthModule } from "./app/app-auth.module";
import { HadiahModule } from "./hadiah/hadiah.module";
import { MemberModule } from "./member/member.module";
import { UserModule } from "./user/user.module";

const systemProviders = [AppAuthModule, UserModule, MemberModule, HadiahModule];

export const resourceProviders = [...systemProviders];
