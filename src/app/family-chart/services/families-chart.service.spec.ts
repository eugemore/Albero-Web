import { TestBed } from '@angular/core/testing';

import { FamilyChartService } from './families-chart.service';

describe('FamilyChartService', () => {
  let service: FamilyChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
