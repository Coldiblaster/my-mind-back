import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { EnvService } from '../env/env.service';
import { ClerkMiddleware } from './clerk.middleware';
import { ClerkStrategy } from './clerk.strategy';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Module({
  providers: [
    ClerkStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  // exports: [ClerkAuthGuard, ClerkStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkMiddleware).forRoutes('*'); // Aplique o middleware em todas as rotas
  }
}
