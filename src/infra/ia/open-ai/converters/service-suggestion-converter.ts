import { IaGenerateServiceProps } from '@/domain/platform/enterprise/entities/ia-generate-service.entity';

export class ServiceSuggestionConverter {
  static converter(
    responseText: string,
    businessTypeId: number,
  ): IaGenerateServiceProps[] {
    const servicePattern =
      /- Serviço (\d+):\s*- Nome:\s*(.*?)\s*- Descrição:\s*(.*?)\s*- Tempo de execução:\s*(\d+)\s*minutos\s*- Custo:\s*R\$\s*(\d+)(?:,(\d{2}))?/g;

    // Cria um array para armazenar os serviços processados
    const services: IaGenerateServiceProps[] = [];

    let match;

    // Loop sobre os matches encontrados pela expressão regular
    while ((match = servicePattern.exec(responseText)) !== null) {
      // Debug: Verificando os valores capturados pela regex

      const [space, id, name, description, time, costInt, costDecimal] = match;

      // Verificando a captura do custo, caso tenha uma vírgula
      const cost = parseFloat(`${costInt}.${costDecimal || '00'}`);

      // Adiciona o serviço processado no array
      services.push({
        title: name.trim(),
        description: description.trim(),
        value: cost,
        time: parseInt(time, 10),
        businessTypeId,
      });
    }

    return services;
  }
}
