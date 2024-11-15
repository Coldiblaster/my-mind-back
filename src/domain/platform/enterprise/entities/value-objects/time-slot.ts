export class TimeSlot {
  private constructor(
    public startTime: Date,
    public endTime: Date,
  ) { }

  static create({ startTime, endTime }: { startTime: Date; endTime: Date }) {
    if (endTime <= startTime)
      throw new Error('End time must be after start time');
    return new TimeSlot(startTime, endTime);
  }

  conflictsWith(other: TimeSlot): boolean {
    return (
      (this.startTime >= other.startTime && this.startTime < other.endTime) ||
      (other.startTime >= this.startTime && other.startTime < this.endTime)
    );
  }
}
