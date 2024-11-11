import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { BusinessTypeFactory } from 'test/factories/make-business-type';
import { CompanyFactory } from 'test/factories/make-company';
import { ProfessionalFactory } from 'test/factories/make-professional';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create Service Suggestion (E2E)', () => {
  let app: INestApplication;

  let prisma: PrismaService;
  let professionalFactory: ProfessionalFactory;
  let companyFactory: CompanyFactory;
  let addressFactory: AddressFactory;
  let businessTypeFactory: BusinessTypeFactory;

  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfessionalFactory,
        CompanyFactory,
        AddressFactory,
        BusinessTypeFactory,
        JwtService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    professionalFactory = moduleRef.get(ProfessionalFactory);
    companyFactory = moduleRef.get(CompanyFactory);
    addressFactory = moduleRef.get(AddressFactory);
    businessTypeFactory = moduleRef.get(BusinessTypeFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test.skip('[POST] /service-suggestion/generate', async () => {
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

    await businessTypeFactory.makePrismaBusinessType({}, 1);

    const response = await request(app.getHttpServer())
      .post('/service-suggestion/generate')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        segment: 'barbeiro',
        businessTypeId: 1,
      });

    expect(response.statusCode).toBe(201);

    const serviceSuggestionOnDatabase =
      await prisma.serviceSuggestion.findFirst({
        where: {
          businessTypeId: 1,
        },
      });

    expect(serviceSuggestionOnDatabase).toBeTruthy();
  }, 10000);
});
