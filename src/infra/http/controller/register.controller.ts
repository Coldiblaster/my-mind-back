import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';

import { ProfessionalAlreadyExistsError } from '@/domain/register/application/use-cases/errors/professional-already-exists-error';
import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';
import {
  CreateCompanySchema,
  createCompanySchema,
} from '@/domain/register/application/validations/create-company-schema';
import { Public } from '@/infra/auth/public';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

@Controller('/register')
@Public()
export class RegisterController {
  constructor(private registerCompany: RegisterCompanyUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCompanySchema))
  async handle(@Body() body: CreateCompanySchema) {
    const {
      address,
      clerkId,
      email,
      operatingHours,
      businessTypeId,
      customSegment,
      services,
    } = body;

    const result = await this.registerCompany.execute({
      email,
      address,
      clerkId,
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
