import { Test, TestingModule } from '@nestjs/testing';
import { BotGateway } from './bot.gateway';

describe('BotGateway', () => {
  let gateway: BotGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotGateway],
    }).compile();

    gateway = module.get<BotGateway>(BotGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
