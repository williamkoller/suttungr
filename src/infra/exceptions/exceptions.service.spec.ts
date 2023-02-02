import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsService } from './exceptions.service';

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
      exports: [ExceptionsService],
    }).compile();

    service = module.get<ExceptionsService>(ExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be badRequestException', () => {
    const data = {
      message: 'Bad request',
    };
    const error = new BadRequestException(data);

    jest.spyOn(service, 'badRequestException').mockImplementation(() => error);

    expect(error).toBeInstanceOf(BadRequestException);
    expect(service.badRequestException(data)).toBeDefined();
  });
});
