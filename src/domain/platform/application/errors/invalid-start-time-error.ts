import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidStartTimeError extends Error implements UseCaseError {
  constructor(startTime: Date) {
    super(
      `O horário de início (${startTime.toISOString()}) deve ser no futuro para o dia atual.`,
    );
  }
}
