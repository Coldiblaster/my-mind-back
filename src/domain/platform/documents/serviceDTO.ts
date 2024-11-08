import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class ServiceDTO {
  @ApiProperty({
    description: 'ID do serviço',
    example: randomUUID(),
  })
  id!: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Consultoria em TI',
  })
  description!: string;

  @ApiProperty({
    description: 'Valor do serviço',
    example: 100,
  })
  value!: number;

  @ApiProperty({
    description: 'Tempo estimado para o serviço',
    example: '2:00',
  })
  time!: string;

  @ApiProperty({
    description: 'Data de criação do serviço',
    example: '2024-11-08T13:01:54.819Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-11-08T14:01:54.819Z',
    required: false,
    nullable: true,
  })
  updatedAt!: string | null;
}
