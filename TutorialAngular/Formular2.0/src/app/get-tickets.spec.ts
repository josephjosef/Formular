import { TestBed } from '@angular/core/testing';

import { GetTickets } from './get-tickets';

describe('GetTickets', () => {
  let service: GetTickets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTickets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
