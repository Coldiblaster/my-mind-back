import { verifyToken } from '@clerk/express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { z } from 'zod';

import { EnvService } from '../env/env.service';

const tokenPayloadSchema = z.object({
  providerId: z.string().uuid(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(private envService: EnvService) {
    super();
  }

  async validate(req: Request): Promise<UserPayload> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação ausente');
    }

    if (process.env.NODE_ENV === 'test') {
      return {
        providerId: 'mocked-provider-id',
      };
    }

    try {
      const token = authHeader.replace('Bearer ', '');

      const auth = await verifyToken(token, {
        secretKey: this.envService.get('CLERK_SECRET_KEY'),
      });

      if (!auth.professionalId) {
        throw new UnauthorizedException('Sessão inválida ou não encontrada');
      }

      return {
        providerId: auth.professionalId,
      };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
