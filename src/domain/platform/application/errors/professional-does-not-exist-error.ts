import { UseCaseError } from '@/core/errors/use-case-error';

export class ProfessionalDoesNotExistError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Professional "${identifier}" does not exist.`);
  }
}
