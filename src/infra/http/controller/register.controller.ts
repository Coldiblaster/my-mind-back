import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { ProfessionalAlreadyExistsError } from '@/domain/register/application/use-cases/errors/professional-already-exists-error';
import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';
import {
  CreateCompanyDTO,
  CreateCompanySchema,
  createCompanySchema,
} from '@/domain/register/application/validations/create-company-schema';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

@Controller('/register')
export class RegisterController {
  constructor(private registerCompany: RegisterCompanyUseCase) { }

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCompanySchema))
  @ApiBody({
    type: CreateCompanyDTO,
  })
  async handle(@Body() body: CreateCompanySchema) {
    const {
      address,
      providerId,
      email,
      operatingHours,
      businessTypeId,
      customSegment,
      services,
    } = body;

    const result = await this.registerCompany.execute({
      email,
      address,
      providerId,
      operatingHours,
      businessTypeId,
      customSegment,
      services,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
