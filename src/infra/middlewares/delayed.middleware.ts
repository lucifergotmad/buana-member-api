import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class DelayedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    setTimeout(() => {
      next();
    }, 3000);
  }
}
