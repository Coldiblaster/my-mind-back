import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { CompanyFactory } from 'test/factories/make-company';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let addressFactory: AddressFactory;
  let companyFactory: CompanyFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AddressFactory, CompanyFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    addressFactory = moduleRef.get(AddressFactory);
    companyFactory = moduleRef.get(CompanyFactory);

    await app.init();
  });

  test('[POST] /register', async () => {
    const address = await addressFactory.makePrismaAddress();
    const company = await companyFactory.makePrismaCompany({
      addressId: address.id,
    });

    console.log(address);

    const response = await request(app.getHttpServer())
      .post('/register')
      .send({
        address,
        email: 'johndoe@example.com',
        customSegment: 'Manutenção de celular',
        clerkId: '1',
        operatingHours: {
          companyId: company.id,
          days: [
            {
              startTime: '8:00',
              endTime: '18:00',
              isOpen: true,
              weekday: 'Segunda-Feira',
            },
          ],
        },
      });

    console.log(response);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.professional.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
