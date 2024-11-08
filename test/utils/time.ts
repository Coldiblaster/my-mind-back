import { faker } from '@faker-js/faker';

const startHour = faker.number.int({ min: 6, max: 21 });
const startMinute = faker.number.int({ min: 0, max: 59 });

export const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;

const endHour = faker.number.int({ min: startHour, max: 22 });
let endMinute = faker.number.int({ min: 0, max: 59 });

if (endHour === startHour && endMinute <= startMinute) {
  endMinute = startMinute + faker.number.int({ min: 1, max: 59 - startMinute });
}

export const endTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;
