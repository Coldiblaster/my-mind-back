import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from '@/infra/auth/auth.module';

import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { HttpModule } from './http/http.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: seconds(1),
        limit: 3,
        blockDuration: seconds(5),
      },
      {
        name: 'medium',
        ttl: seconds(10),
        limit: 20,
        blockDuration: seconds(5),
      },
      {
        name: 'long',
        ttl: seconds(60),
        limit: 100,
        blockDuration: seconds(5),
      },
    ]),
    AuthModule,
    HttpModule,
    EnvModule,
    IaModule,
  ],
})
export class AppModule { }
