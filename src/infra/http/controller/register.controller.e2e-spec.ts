import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { CompanyFactory } from 'test/factories/make-company';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Register Account (E2E)', () => {
  let app: INestApplication;

  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AddressFactory, CompanyFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /register', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .set('Authorization', `Bearer token`)
      .send({
        address: {
          cep: '47092',
          street: 'Conner Orchard',
          number: '4641161880018294',
          neighborhood: 'Pakistan',
          city: 'New Tod',
          state: 'New York',
        },
        email: 'johndoe@example.com',
        customSegment: 'Manutenção de celular',
        providerId: '105',
        operatingHours: {
          days: [
            {
              startTime: '8:00',
              endTime: '18:00',
              isOpen: true,
              weekday: 'Segunda-Feira',
            },
            {
              startTime: '8:00',
              endTime: '18:00',
              isOpen: true,
              weekday: 'Terça-Feira',
            },
          ],
        },
        services: [
          {
            description: 'Cabelo',
            time: 50,
            value: 30,
          },
          {
            description: 'Barba',
            time: 20,
            value: 20,
          },
        ],
      });

    expect(response.statusCode).toBe(201);

    const profissionalOnDatabase = await prisma.professional.findUnique({
      where: {
        email: 'johndoe@example.com',
        providerId: '105',
      },
    });

    expect(profissionalOnDatabase).toBeTruthy();

    const operatingHoursOnDatabase = await prisma.openingHours.findMany({
      where: {
        companyId: profissionalOnDatabase?.companyId,
      },
    });

    expect(operatingHoursOnDatabase).toHaveLength(2);

    const ProfessionalServices = await prisma.professionalService.findMany({
      where: {
        professionalId: profissionalOnDatabase?.id,
      },
      select: {
        service: true,
      },
    });

    expect(ProfessionalServices).toHaveLength(2);
  });
});
