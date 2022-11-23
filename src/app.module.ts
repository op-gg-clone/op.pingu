import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LolModule } from './lol/lol.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), LolModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
