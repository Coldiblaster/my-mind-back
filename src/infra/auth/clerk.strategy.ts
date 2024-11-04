import { getAuth } from '@clerk/express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

export interface AuthObject {
  userId: string;
  sessionId: string;
}

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  async validate(req: Request): Promise<AuthObject> {
    const auth = getAuth(req);

    if (!auth || !auth.sessionId) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      userId: auth.userId,
      sessionId: auth.sessionId,
    };
  }
}
