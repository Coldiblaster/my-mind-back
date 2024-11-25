import { UseCaseError } from '@/core/errors/use-case-error';

export class ProfessionalUserNameAlreadyExistsError
  extends Error
  implements UseCaseError {
  constructor(identifier: string) {
    super(`Professional username"${identifier}" already exists.`);
  }
}
