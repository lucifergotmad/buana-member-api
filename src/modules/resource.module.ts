import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DecryptorMiddleware } from "src/infra/middlewares/decryptor.middleware";
import { DelayedMiddleware } from "src/infra/middlewares/delayed.middleware";
import { resourceProviders } from "./resource.provider";

@Module({
  exports: resourceProviders,
  imports: resourceProviders,
})
export class ResourceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptorMiddleware, DelayedMiddleware).forRoutes("*");
  }
}
