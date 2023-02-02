import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentService, ConfigService],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be getJwtSecret', () => {
    const environmentService = service.getJwtSecret();
    jest
      .spyOn(service, 'getJwtSecret')
      .mockImplementation(() => environmentService);
    expect(service.getJwtSecret()).toEqual(environmentService);
  });

  it('should be getJwtRefreshToken', () => {
    const environmentService = service.getJwtRefreshToken();
    jest
      .spyOn(service, 'getJwtRefreshToken')
      .mockImplementation(() => environmentService);
    expect(service.getJwtRefreshToken()).toEqual(environmentService);
  });

  it('should be getExpiresIn', () => {
    const environmentService = service.getExpiresIn();
    jest
      .spyOn(service, 'getExpiresIn')
      .mockImplementation(() => environmentService);
    expect(service.getExpiresIn()).toEqual(environmentService);
  });

  it('should be getJwtRefreshTokenExpirationTime', () => {
    const environmentService = service.getJwtRefreshTokenExpirationTime();
    jest
      .spyOn(service, 'getJwtRefreshTokenExpirationTime')
      .mockImplementation(() => environmentService);
    expect(service.getJwtRefreshTokenExpirationTime()).toEqual(
      environmentService,
    );
  });
});
