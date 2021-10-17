import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact.model';
import { CreateContactAction, HandleRouteNavigation, UpdateContactAction } from 'src/app/shared/store/actions/contacts.action';
import { getClient, getNotification, isNew, loading } from 'src/app/shared/store/selectors/contacts.selectors';
import { AppState } from 'src/app/shared/store/state/contacts.state';
import { Location } from '@angular/common';
import { ActionType } from 'src/app/shared/models/contact.action-type.model';
import { ActionNotification } from 'src/app/shared/models/notification.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit {

  public contactForm: FormGroup;

  public actionType: typeof ActionType = ActionType;
  loading$: Observable<boolean> | undefined;
  contact$: Observable<Contact>;
  isNew$: Observable<boolean> | undefined;
  notification$: Observable<ActionNotification | undefined>;

  id: string = '';
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private location: Location) {

    this.contactForm = new FormGroup({
      firstName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      surname: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      dateOfBirth: new FormControl(new Date(), [Validators.required, this.validatorDateOfBirth]),
      email: new FormControl("", [Validators.required, Validators.email])
    });
    this.contact$ = this.store.select(getClient);
    this.isNew$ = this.store.select(isNew);
    this.notification$ = this.store.select(getNotification);
  }

  ngOnInit() {
    this.loading$ = this.store.select(loading);
    const id = this.route.snapshot.params.id;
    this.store.dispatch(new HandleRouteNavigation(id));

  }

  goBack = () => {
    this.location.back();
  }

  upsert = (action: ActionType) => {
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
