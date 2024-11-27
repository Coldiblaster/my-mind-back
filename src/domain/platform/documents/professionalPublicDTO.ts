import { ApiProperty } from '@nestjs/swagger';

export class ProfessionalPublicDTO {
  @ApiProperty({
    description: 'Nome do Profissional',
    example: 'Joe Doe',
  })
  name!: string;

  @ApiProperty({
    description: 'Email do Profissional',
    example: 'joe-doe@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Informação sobre o Profissional',
    example: 'Consultoria em TI a mais de 5 anos.',
  })
  bio!: string;

  @ApiProperty({
    description: 'Ocupação do Profissional',
    example: 'Consultor de TI',
  })
  occupation!: number;
}
