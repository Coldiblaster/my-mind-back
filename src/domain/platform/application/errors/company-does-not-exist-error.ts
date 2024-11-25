import { UseCaseError } from '@/core/errors/use-case-error';

export class CompanyDoesNotExistError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Company "${identifier}" does not exist.`);
  }
}
