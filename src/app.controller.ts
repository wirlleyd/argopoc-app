import { Controller, Get, Res } from '@nestjs/common';
import {Response} from 'express'
import { AppService } from './app.service';

@Controller()
export class AppController {
  private started_at = new Date()
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/healthz")
  healthz(@Res() response: Response) {
    const current_date = new Date();
    const date_in_seconds = (current_date.getTime() - this.started_at.getTime()) / 1000;
    // if(date_in_seconds > 30){
    //   return response
    //     .status(500)
    //     .send("Im broken");
    // }
    return response
      .status(200)
      .send("Im alive");
  }
}
