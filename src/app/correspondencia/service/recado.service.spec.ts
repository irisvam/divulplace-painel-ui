import { TestBed } from '@angular/core/testing';

import { RecadoService } from './recado.service';

describe('RecadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecadoService = TestBed.get(RecadoService);
    expect(service).toBeTruthy();
  });
});
