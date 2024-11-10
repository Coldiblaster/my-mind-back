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
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Delete Service (E2E)', () => {
  let app: INestApplication;

  let prisma: PrismaService;

  let professionalFactory: ProfessionalFactory;
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

    prisma = moduleRef.get(PrismaService);

    professionalFactory = moduleRef.get(ProfessionalFactory);
    companyFactory = moduleRef.get(CompanyFactory);
    addressFactory = moduleRef.get(AddressFactory);

    serviceFactory = moduleRef.get(ServiceFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[DELETE] /service/:id', async () => {
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

    const service = await serviceFactory.makePrismaService({
      description: 'Cabelo',
      value: 30,
    });

    const response = await request(app.getHttpServer())
      .delete(`/service/${service.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    const serviceOnDatabase = await prisma.service.findFirst({
      where: {
        id: service.id.toString(),
      },
    });

    expect(serviceOnDatabase).toEqual(
      expect.objectContaining({
        isActive: false,
      }),
    );
  });
});
