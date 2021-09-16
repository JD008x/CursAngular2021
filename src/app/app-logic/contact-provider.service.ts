import { Injectable } from '@angular/core';
import { ContactData } from './contact-data';

@Injectable({
  providedIn: 'root'
})
export class ContactProviderService {
  providedData = <ContactData> {
    address:'Address',
    information: 'Information data',
    openDays:'M-F',
    phone:'+40743423467',
    timeSlot: '10:00 - 17:00'

  }

  constructor() { }

  getData():ContactData{
    return this.providedData;
  }
}
