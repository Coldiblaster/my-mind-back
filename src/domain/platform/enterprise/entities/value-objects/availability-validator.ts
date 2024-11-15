import { Injectable } from '@nestjs/common';

import { AvailabilityConflictError } from '@/domain/platform/application/errors/availability-conflict-error';
import { InvalidDateError } from '@/domain/platform/application/errors/invalid-date-error';
import { InvalidStartTimeError } from '@/domain/platform/application/errors/invalid-start-time-error';
import { Availability } from '@/domain/platform/enterprise/entities/availability.entity';
import { TimeSlot } from '@/domain/platform/enterprise/entities/value-objects/time-slot';

interface ValidationParams {
  timeSlots: { startTime: Date; endTime: Date }[];
  date: Date;
  existingAvailabilities: Availability[];
  currentDate: Date;
}

export class AvailabilityValidator {
  static validateDate(date: Date, currentDate: Date): void {
    if (date < currentDate) {
      throw new InvalidDateError(date);
    }
  }

  static validateTimeSlots({
    timeSlots,
    date,
    existingAvailabilities,
    currentDate,
  }: ValidationParams): void {
    const sortedTimeSlots = [...timeSlots].sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );

    const timeSlotSet = new Set<string>();
    for (let i = 0; i < sortedTimeSlots.length; i++) {
      const { startTime, endTime } = sortedTimeSlots[i];
      const timeSlotKey = `${startTime.toISOString()}-${endTime.toISOString()}`;

      if (timeSlotSet.has(timeSlotKey)) {
        throw new AvailabilityConflictError(startTime, endTime);
      }

      timeSlotSet.add(timeSlotKey);

      const newTimeSlot = TimeSlot.create({ startTime, endTime });

      if (this.hasConflictingTimeSlot(existingAvailabilities, newTimeSlot)) {
        throw new AvailabilityConflictError(startTime, endTime);
      }

      if (i < sortedTimeSlots.length - 1) {
        const nextSlot = sortedTimeSlots[i + 1];
        if (newTimeSlot.endTime > nextSlot.startTime) {
          throw new AvailabilityConflictError(startTime, endTime);
        }
      }

      if (
        date.toDateString() === currentDate.toDateString() &&
        startTime <= currentDate
      ) {
        throw new InvalidStartTimeError(startTime);
      }
    }
  }

  private static hasConflictingTimeSlot(
    existingAvailabilities: Availability[],
    newTimeSlot: TimeSlot,
  ): boolean {
    return existingAvailabilities.some(existingAvailability => {
      const existingTimeSlot = TimeSlot.create({
        startTime: existingAvailability.startTime,
        endTime: existingAvailability.endTime,
      });

      return (
        newTimeSlot.startTime < existingTimeSlot.endTime &&
        newTimeSlot.endTime > existingTimeSlot.startTime
      );
    });
  }
}
