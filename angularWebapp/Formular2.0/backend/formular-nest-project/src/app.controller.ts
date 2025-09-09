import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Formular } from './formular';

@Controller("/api/formular")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getFormulare")
  async getFormulare() {
    console.log("get Funktioniert")
    return this.appService.findAll()
  }

  @Post("/postFormular")
  async postFormulare(@Body() formular: Formular) {
    console.log("post funktioniert")
    this.appService.addFormular(formular);
    return { formular }
  }
}