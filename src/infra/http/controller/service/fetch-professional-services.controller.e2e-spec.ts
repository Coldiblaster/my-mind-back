import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AddressFactory } from 'test/factories/make-address';
import { CompanyFactory } from 'test/factories/make-company';
import { ProfessionalFactory } from 'test/factories/make-professional';
import { ProfessionalServicesFactory } from 'test/factories/make-professional-services';
import { ServiceFactory } from 'test/factories/make-service';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Fetch Professional Services (E2E)', () => {
  let app: INestApplication;

  let professionalFactory: ProfessionalFactory;
  let professionalServicesFactory: ProfessionalServicesFactory;
  let serviceFactory: ServiceFactory;
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
        ServiceFactory,
        ProfessionalServicesFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    professionalFactory = moduleRef.get(ProfessionalFactory);
    companyFactory = moduleRef.get(CompanyFactory);
    addressFactory = moduleRef.get(AddressFactory);
    professionalServicesFactory = moduleRef.get(ProfessionalServicesFactory);
    serviceFactory = moduleRef.get(ServiceFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /service', async () => {
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

    const service1 = await serviceFactory.makePrismaService({
      description: 'Cabelo',
      value: 30,
    });

    const service2 = await serviceFactory.makePrismaService({
      description: 'Barba',
      value: 20,
    });

    await Promise.all([
      professionalServicesFactory.makePrismaProfessionalServices({
        professionalId: professional.id,
        serviceId: service1.id,
      }),
      professionalServicesFactory.makePrismaProfessionalServices({
        professionalId: professional.id,
        serviceId: service2.id,
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/service')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      services: expect.arrayContaining([
        expect.objectContaining({
          description: 'Cabelo',
          value: 30,
        }),
        expect.objectContaining({
          description: 'Barba',
          value: 20,
        }),
      ]),
    });
  });
});
