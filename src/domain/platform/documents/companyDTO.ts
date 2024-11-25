import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class CompanyDTO {
  @ApiProperty({
    description: 'ID da empresa',
    example: randomUUID(),
  })
  id!: string;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Consultoria em TI',
  })
  name!: string;

  @ApiProperty({
    description: 'Nome do seguimento',
    example: 'TI',
  })
  customSegment!: string;

  @ApiProperty({
    description: 'Link único para gerar a pagina da empresa',
    example: '/consultoria-ti',
  })
  link!: string;

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
