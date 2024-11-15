import { UseCaseError } from '@/core/errors/use-case-error';

export class AvailabilityConflictError extends Error implements UseCaseError {
  constructor(startTime: Date, endTime: Date) {
    super(
      `Conflict with existing availability from ${startTime.toISOString()} to ${endTime.toISOString()}.`,
    );
  }
}
