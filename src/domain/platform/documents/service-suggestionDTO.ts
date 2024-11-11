import { ApiProperty } from '@nestjs/swagger';

export class ServiceSuggestionDTO {
  @ApiProperty({
    description: 'ID do serviço',
    example: '1c34d275-65da-44a9-b241-f100c9cee4e9',
  })
  id!: string;

  @ApiProperty({
    description: 'Título do serviço',
    example: 'Construção de parede',
  })
  title!: string;

  @ApiProperty({
    description: 'Valor do serviço em R$',
    example: 500,
  })
  value!: number;

  @ApiProperty({
    description: 'Descrição do serviço',
    example:
      'Construção de parede de alvenaria, incluindo preparação do terreno, assentamento de tijolos e acabamento.',
  })
  description!: string;

  @ApiProperty({
    description: 'Tempo de execução do serviço em minutos',
    example: 240,
  })
  time!: number;

  @ApiProperty({
    description: 'Data de criação do serviço',
    example: '2024-11-11T18:12:12.291Z',
  })
  createdAt!: string;
}
