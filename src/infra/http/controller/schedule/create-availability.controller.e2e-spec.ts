import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { CompanyFactory } from 'test/factories/make-company';
import { ProfessionalFactory } from 'test/factories/make-professional';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create Availability (E2E)', () => {
  let app: INestApplication;

  let prisma: PrismaService;
  let professionalFactory: ProfessionalFactory;
  let companyFactory: CompanyFactory;
  let addressFactory: AddressFactory;

  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfessionalFactory,
        CompanyFactory,
        AddressFactory,
        JwtService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    professionalFactory = moduleRef.get(ProfessionalFactory);
    companyFactory = moduleRef.get(CompanyFactory);
    addressFactory = moduleRef.get(AddressFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /availability', async () => {
    const newAddress = await addressFactory.makePrismaAddress();
    const newCompany = await companyFactory.makePrismaCompany({
      addressId: newAddress.id,
    });
    const professional = await professionalFactory.makePrismaProfessional({
      companyId: newCompany.id,
      providerId: 'mocked-provider-id',
    });

    const accessToken = jwt.sign({
      providerId: professional.id.toString(),
    });

    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    function createDateWithTime(
      baseDate: Date,
      hours: number,
      minutes: number,
    ) {
      const dateWithTime = new Date(baseDate);
      dateWithTime.setHours(hours, minutes, 0, 0);
      return dateWithTime;
    }

    const response = await request(app.getHttpServer())
      .post('/availability')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        date: tomorrow,
        timeSlots: [
          {
            startTime: createDateWithTime(tomorrow, 8, 0).toISOString(),
            endTime: createDateWithTime(tomorrow, 9, 0).toISOString(),
          },
          {
            startTime: createDateWithTime(tomorrow, 9, 0).toISOString(),
            endTime: createDateWithTime(tomorrow, 10, 0).toISOString(),
          },
          {
            startTime: createDateWithTime(tomorrow, 10, 0).toISOString(),
            endTime: createDateWithTime(tomorrow, 11, 0).toISOString(),
          },
        ],
        providerId: professional.providerId,
      });

    expect(response.statusCode).toBe(201);

    const availabilityOnDatabase = await prisma.availability.findFirst({
      where: {
        professionalId: professional.id.toString(),
      },
    });

    expect(availabilityOnDatabase).toBeTruthy();
  });
});
