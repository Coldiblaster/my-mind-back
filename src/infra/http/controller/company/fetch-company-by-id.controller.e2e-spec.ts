import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { CompanyFactory } from 'test/factories/make-company';
import { ProfessionalFactory } from 'test/factories/make-professional';
import { ProfessionalServicesFactory } from 'test/factories/make-professional-services';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Fetch Company By Id (E2E)', () => {
  let app: INestApplication;

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
        ProfessionalServicesFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    professionalFactory = moduleRef.get(ProfessionalFactory);
    companyFactory = moduleRef.get(CompanyFactory);
    addressFactory = moduleRef.get(AddressFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /service/:serviceId', async () => {
    const newAddress = await addressFactory.makePrismaAddress();
    const newCompany = await companyFactory.makePrismaCompany({
      addressId: newAddress.id,
    });

    const professional = await professionalFactory.makePrismaProfessional({
      providerId: 'mocked-provider-id',
      companyId: newCompany.id,
    });

    const accessToken = jwt.sign({
      providerId: professional.id.toString(),
    });

    const response = await request(app.getHttpServer())
      .get(`/company`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
  });
});
