import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { EnvService } from '../env/env.service';
import { ClerkStrategy } from './clerk.strategy';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Module({
  providers: [
    ClerkStrategy,
    EnvService,
    ClerkAuthGuard,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AuthModule { }
