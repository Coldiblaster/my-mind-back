import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { IaGenerateService } from '@/domain/platform/application/repositories/ia-generate-service';
import { IaGenerateServiceProps } from '@/domain/platform/enterprise/entities/ia-generate-service.entity';
import { EnvService } from '@/infra/env/env.service';

import { ServiceSuggestionConverter } from '../converters/service-suggestion-converter';

@Injectable()
export class OpenAiServiceSuggestionRepository implements IaGenerateService {
  private openAi: OpenAI;

  constructor(private envService: EnvService) {
    this.openAi = new OpenAI({
      apiKey: this.envService.get('OPENAI_API_KEY'),
    });
  }

  async generateServiceSuggestion(
    segment: string,
    businessTypeId: number,
  ): Promise<IaGenerateServiceProps[]> {
    try {
      const prompt = `Gere uma lista com 6 tipos de serviços para o segmento "${segment}", incluindo os seguintes campos:
        1. Nome do serviço
        2. Descrição do serviço
        3. Tempo de execução (em minutos)
        4. Custo (em R$)

        Por favor, forneça a resposta no seguinte formato:
        - Serviço 1:
          - Nome: [Nome do serviço]
          - Descrição: [Descrição do serviço]
          - Tempo de execução: [Tempo de execução em minutos]
          - Custo: [Custo em R$]

        - Serviço 2:
          - Nome: [Nome do serviço]
          - Descrição: [Descrição do serviço]
          - Tempo de execução: [Tempo de execução em minutos]
          - Custo: [Custo em R$]

        ... E assim por diante até o serviço 6.`;

      const response = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const rawResponse = response.choices[0].message.content;

      if (!rawResponse)
        throw new Error('Failed to generate service description');

      return ServiceSuggestionConverter.converter(rawResponse, businessTypeId);
    } catch (error) {
      console.error('Error generating service description:', error);
      throw new Error('Failed to generate service description');
    }
  }
}
