import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ContactActionType } from "../../models/contact.action.model";
import { ContactsService } from "../../services/contacts-service";
import { CreateContactSuccessAction, ErrorAction, GetContactDetailsAction, GetContactDetailsSuccessAction, GetContactsSuccessAction, NewContactAction, StoreActions, UpdateContactSuccessAction } from "../actions/contacts.action";

@Injectable()
export class ContactsEffect {
    constructor(private actions$: Actions<StoreActions>, private service: ContactsService, private router: Router) { }

    getContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactActionType.GET_CONTACTS),
            mergeMap(() =>
                this.service.getContacts().pipe(
                    map((clients) => (new GetContactsSuccessAction(clients))),
                    catchError((error: any) => of(new ErrorAction(error)))
                )
            )
        )
    );

    getContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactActionType.GET_CONTACT),
            mergeMap((action) =>
                this.service.getContact(action.id).pipe(
                    map((client) => (new GetContactDetailsSuccessAction(client))),
                    catchError((error: any) => of(new ErrorAction(error)))
                )
            )
        )
    );

    createContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactActionType.CREATE_CONTACT),
            mergeMap((action) =>
                this.service.createContact(action.payload).pipe(
                    map((client) => (new CreateContactSuccessAction(client))),
                    catchError((error: any) => of(new ErrorAction(error)))
                )
            )
        )
    );

    updateContact$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ContactActionType.UPDATE_CONTACT),
        mergeMap((action) =>
            this.service.updateContact(action.id, action.payload).pipe(
                map((client) => (new UpdateContactSuccessAction(client))),
                catchError((error: any) => of(new ErrorAction(error)))
            )
        )
    )
);
    navigateClientDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactActionType.NAVIGATE_CONTACT_DETAILS, ContactActionType.NAVIGATE_NEW_CONTACT_DETAILS),
            tap((action) => this.router.navigateByUrl(`${action.url}`))),
        { dispatch: false },
    );

    handleRouteNavigation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactActionType.ROUTE_NAVIGATION),
            switchMap((action) => {
                let actionsToDispatch = [];
                let id = action.id;
                if (id.toLowerCase() === 'new') {
                    actionsToDispatch.push(new NewContactAction())
                } else {
                    actionsToDispatch.push(new GetContactDetailsAction(id))
                }
                return actionsToDispatch
            }))
    );

}

