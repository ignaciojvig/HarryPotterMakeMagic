import { Test, TestingModule } from '@nestjs/testing';
import { CommandHandler } from './command-handler';

describe('CommandHandler', () => {
  let service: CommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandHandler],
    }).compile();

    service = module.get<CommandHandler>(CommandHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
