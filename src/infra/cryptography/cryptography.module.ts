import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { Encrypter } from '@/domain/platform/application/cryptography/encrypter';

import { JwtEncrypter } from './jwt-encrypter';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key', // defina uma chave secreta para JWT
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [Encrypter],
})
export class CryptographyModule {}
