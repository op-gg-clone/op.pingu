import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Summoner } from './interfaces/summoner.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  findMatchList(@Param('name') name: string): any {
    return this.appService.getAll(name);
  }

  @Get(':name/matches/:matchId')
  findMatch(@Param('matchId') matchId: string): string {
    return matchId;
  }
}
