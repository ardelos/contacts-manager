import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from './details.component';
import { ContactsReducer } from 'src/app/shared/store/reducers/contacts.reducers';

describe('Component Details', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    contact$ = jasmine.createSpy().and.returnValue(of({ id: 1, firstName: 'Name1', surname: 'Surname1', email: "text@email1.com", dateOfBirth: new Date(2000, 1, 1) }));
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [RouterTestingModule, StoreModule.forRoot({appstate: ContactsReducer}, {}),],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show edit form', async () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    await fixture.whenStable();

    const button = [...fixture.nativeElement.querySelectorAll('button')].filter((b:HTMLElement)=> b.innerHTML.includes('Update'));
    expect(button.length).toEqual(1);
  });
});
