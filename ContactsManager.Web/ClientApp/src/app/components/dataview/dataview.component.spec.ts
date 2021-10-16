import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ContactsReducer } from 'src/app/shared/store/reducers/contacts.reducers';

import { DataviewComponent } from './dataview.component';

describe('Component Dataview', () => {
  let component: DataviewComponent;
  let fixture: ComponentFixture<DataviewComponent>;

  
  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataviewComponent ],
      imports: [RouterTestingModule, StoreModule.forRoot({appstate: ContactsReducer}, {}),],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
