import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserLevel } from "src/core/constants/app/user/user-level.const";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "user_id" });
  }

  async validate(
    user_id: string,
    password: string,
  ): Promise<Partial<UserMongoEntity> | null> {
    const user = await this.authService.validateUser(user_id, password);
    if (!user) {
      throw new UnauthorizedException("Email dan Password tidak valid!");
    }

    if (
      user.level !== UserLevel.AdminMember &&
      user.level !== UserLevel.Owner
    ) {
      throw new UnauthorizedException("Maaf user ini tidak memiliki akses!");
    }

    return user;
  }
}
