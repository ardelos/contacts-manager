import { Action } from "@ngrx/store";
import { ContactActionType } from "../../models/contact.action.model";
import { Contact } from "../../models/contact.model";

export class GetContactsAction implements Action {
    readonly type = ContactActionType.GET_CONTACTS
}

export class GetContactsSuccessAction implements Action {
    readonly type = ContactActionType.GET_CONTACTS_SUCCESS
    constructor(public payload: Contact[]) {
    }
}

export class NewContactAction implements Action {
    readonly type = ContactActionType.NEW_CONTACT
    constructor() {
    }
}

export class GetContactDetailsAction implements Action {
    readonly type = ContactActionType.GET_CONTACT
    constructor(public id: string) {
    }
}

export class GetContactDetailsSuccessAction implements Action {
    readonly type = ContactActionType.GET_CONTACT_SUCCESS
    constructor(public payload: Contact) {
    }
}


export class CreateContactAction implements Action {
    readonly type = ContactActionType.CREATE_CONTACT
    constructor(public payload: Contact) {
    }
}
export class CreateContactSuccessAction implements Action {
    readonly type = ContactActionType.CREATE_CONTACT_SUCCESS
    constructor(public payload: Contact) {
    }
}

export class UpdateContactAction implements Action {
    readonly type = ContactActionType.UPDATE_CONTACT
    constructor(public id: string, public payload: Contact) {
    }
}

export class UpdateContactSuccessAction implements Action {
    readonly type = ContactActionType.UPDATE_CONTACT_SUCCESS
    constructor(public payload: Contact) {
    }
}
export class NavigateNewContactDetails implements Action {
    public url?: string;
    readonly type = ContactActionType.NAVIGATE_NEW_CONTACT_DETAILS
    constructor(public baseUrl: string) {
        this.url = `${baseUrl}/new`; 
    }
}



export class NavigateContactDetails implements Action {
    readonly type = ContactActionType.NAVIGATE_CONTACT_DETAILS
    public url?: string;
    constructor(public baseUrl: string, public id: number) {
        this.url = `${baseUrl}/${id}`;   
    }
}
export class HandleRouteNavigation implements Action {
    readonly type = ContactActionType.ROUTE_NAVIGATION
    constructor(public id:string) {
    }
}

export class ErrorAction implements Action {
    readonly type = ContactActionType.ERROR
    constructor(public error: any) {
    }
}


export type StoreActions = GetContactsAction | GetContactsSuccessAction
    | GetContactDetailsAction | GetContactDetailsSuccessAction
    | NavigateContactDetails
    | NavigateNewContactDetails
    | NewContactAction
    | HandleRouteNavigation
    | CreateContactAction | CreateContactSuccessAction
    | UpdateContactAction | UpdateContactSuccessAction
    | ErrorAction;