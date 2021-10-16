import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact.model';
import { CreateContactAction, HandleRouteNavigation, UpdateContactAction, UpdateContactSuccessAction } from 'src/app/shared/store/actions/contacts.action';
import { getClient, isNew, loading } from 'src/app/shared/store/selectors/clients.selectors';
import { AppState } from 'src/app/shared/store/state/clients.state';
import { Location } from '@angular/common';
import { ActionType } from 'src/app/shared/models/contact.action-type.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit, OnDestroy {

  public contactForm: FormGroup;

  public actionType: typeof ActionType = ActionType;
  loading$: Observable<boolean> | undefined;
  contact$: Observable<Contact>;
  onDestroy$ = new Subject<boolean>();
  isNew$: Observable<boolean> | undefined;
  id: string ='';
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private location: Location) {

    this.contactForm = new FormGroup({
      firstName: new FormControl("", [Validators.maxLength(100)]),
      surname: new FormControl("", [Validators.maxLength(100)]),
      dateOfBirth: new FormControl(new Date(), [Validators.required, this.validatorDateOfBirth]),
      email: new FormControl("", [Validators.required, Validators.email])
    });
    this.contact$ = this.store.select(getClient);
    this.isNew$ = this.store.select(isNew);
  }

  ngOnInit() {
    console.log('created')
    this.loading$ = this.store.select(loading);
    const id = this.route.snapshot.params.id;
    this.store.dispatch(new HandleRouteNavigation(id));

  }

  ngOnDestroy(): void {
    console.log('destroyed')
    this.onDestroy$.next(true);
  }

  goBack = () => {
    this.onDestroy$.next(true);
    this.location.back();
  }

  upsert = (action:ActionType) => {
    let contact = this.contactForm.value as Contact;
    if (!contact) return;

    if (action == ActionType.Create) {
      this.store.dispatch(new CreateContactAction(contact));
      return;
    }
    const id = this.route.snapshot.params.id;
    this.store.dispatch(new UpdateContactAction(id, contact)); 
  }
  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  validatorDateOfBirth(control: AbstractControl): { [key: string]: any } | null {
    if (!control || !control.value) return null;
    let diff = new Date().getTime() - new Date(control.value).getTime();
    if (diff < 0) {
      return { 'validDateOfBirth': true };
    }
    return null;
  }

}
