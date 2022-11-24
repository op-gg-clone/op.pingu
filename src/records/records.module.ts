import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

// 클라이언트 요청 - 컨트롤러 - 서비스 - 요청처리 - 다시 컨트롤러 반환 - 응답

@Module({
  imports: [HttpModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
