import { clerkMiddleware, getAuth } from '@clerk/express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authMiddleware = clerkMiddleware();

    await new Promise<void>((resolve, reject) => {
      authMiddleware(req, res, err => {
        if (err) {
          return reject(
            new UnauthorizedException('Falha na autenticação do Clerk'),
          );
        }
        resolve();
      });
    });

    const auth = getAuth(req);

    if (!auth || !auth.sessionId) {
      throw new UnauthorizedException('Sessão inválida ou não encontrada');
    }

    req.user = auth;
    next();
  }
}
