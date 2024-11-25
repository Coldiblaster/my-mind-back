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
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Edit Username (E2E)', () => {
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
        ProfessionalServicesFactory,
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

  test('[PUT] /professional/update-username', async () => {
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
      .put('/professional/update-username')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        providerId: professional.providerId,
        userName: 'joe-doe',
      });

    expect(response.statusCode).toBe(200);

    const professionalOnDatabase = await prisma.professional.findUnique({
      where: {
        userName: 'joe-doe',
      },
    });

    expect(professionalOnDatabase).toBeTruthy();
  });
});
