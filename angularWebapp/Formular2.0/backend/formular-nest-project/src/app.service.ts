import { Injectable } from '@nestjs/common';
import { Formular } from '../../../frontend/src/app/formular-service';

@Injectable()
export class AppService {
  formularList: Formular[] = [];

  addFormular(formular: Formular) {
    this.formularList.push(formular);
    console.log("AppService backend:", formular)
  }

  findAll(): Formular[] {
    return this.formularList;
  }
}