import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LolController } from './lol.controller';
import { LolService } from './lol.service';

@Module({
  imports: [HttpModule],
  controllers: [LolController],
  providers: [LolService],
})
export class LolModule {}
