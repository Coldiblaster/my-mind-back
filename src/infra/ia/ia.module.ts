import { Module } from '@nestjs/common';

import { IaGenerateService } from '@/domain/platform/application/repositories/ia-generate-service';
import { ServiceSuggestionRepository } from '@/domain/platform/application/repositories/service-suggestion-repository';

import { EnvModule } from '../env/env.module';
import { OpenAiServiceSuggestionRepository } from './open-ai/repositories/open-ai-service-suggestion-repository';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: IaGenerateService,
      useClass: OpenAiServiceSuggestionRepository,
    },
    {
      provide: ServiceSuggestionRepository,
      useClass: OpenAiServiceSuggestionRepository,
    },
  ],
  exports: [ServiceSuggestionRepository, IaGenerateService],
})
export class IaModule { }
