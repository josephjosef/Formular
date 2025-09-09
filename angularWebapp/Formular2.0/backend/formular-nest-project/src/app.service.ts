import { Injectable } from '@nestjs/common';
import { Formular } from './formular';

@Injectable()
export class AppService {
  formularList: Formular[] = [];

  addFormular(formular: Formular) {
    const id = this.formularList.length
    formular.id = id
    this.formularList.push(formular);
    console.log("addFormular:", formular)
  }

  findAll(): Formular[] {
    return this.formularList;
  }
}