import { ApiProperty } from '@nestjs/swagger';

export class BusinessTypeDTO {
  @ApiProperty({
    description: 'ID do serviço',
    example: 1,
  })
  id!: string;

  @ApiProperty({
    description: 'Tipo de segmento',
    example: 'Barbearia',
  })
  description!: string;

  @ApiProperty({
    description: 'Ícone',
    example: '💈',
  })
  value!: number;
}
