import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidDateError extends Error implements UseCaseError {
  constructor(date: Date) {
    super(`A data ${date.toISOString()} deve ser atual ou futura.`);
  }
}
