import { UseCaseError } from '@/core/errors/use-case-error';

export class CompanyLinkAlreadyExistsError
  extends Error
  implements UseCaseError {
  constructor(identifier: string) {
    super(`Company link "${identifier}" already exists.`);
  }
}
