import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be hash', () => {
    const hash = service.hash('Q1w2e3r4t5');
    jest.spyOn(service, 'hash').mockImplementation(() => hash);
    expect(service.hash('Q1w2e3r4t5')).toEqual(hash);
  });

  it('should be compare', () => {
    const hash = 'Q1w2e3r4t5';
    const compare = service.compare(hash, 'Q1w2e3r4t5');
    jest.spyOn(service, 'compare').mockImplementation(() => compare);
    expect(service.compare(hash, 'Q1w2e3r4t5')).toEqual(compare);
  });
});
