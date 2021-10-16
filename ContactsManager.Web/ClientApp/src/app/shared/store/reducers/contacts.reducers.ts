import { Action } from '@ngrx/store';
import { ContactActionType } from '../../models/contact.action.model';
import { Contact } from '../../models/contact.model';
import { ActionNotification } from '../../models/notification.model';
import { StoreActions } from '../actions/contacts.action';
import { AppState } from '../state/contacts.state';

export const initialState: AppState = { contacts: [], loading: false, contact: {} as Contact, isNew: false, notification : undefined}

export function ContactsReducer(state: AppState = initialState, action: Action): AppState {
    const contactAction = action as StoreActions;

    switch (contactAction.type) {

        case ContactActionType.GET_CONTACTS:
            console.log('GET_CONTACTS');
            return {
                ...state,
                loading: true,
                notification: undefined
            }
        case ContactActionType.GET_CONTACTS_SUCCESS:
            console.log('GET_CONTACTS_SUCCESS');
            return {
                ...state,
                contacts: contactAction.payload,
                loading: false
            }
        case ContactActionType.GET_CONTACT:
            console.log('GET_CONTACT');
            return {
                ...state,
                contact: {} as Contact,
                loading: true,
                notification: undefined
            }
        case ContactActionType.GET_CONTACT_SUCCESS:
            console.log('GET_CONTACT_SUCCESS');
            return {
                ...state,
                contact: contactAction.payload,
                loading: false
            }
        case ContactActionType.NEW_CONTACT:
            console.log('NEW_CONTACT');
            const newContact = {} as Contact;
            return {
                ...state,
                contact: newContact,
                loading: false,
                notification: undefined
            }
        case ContactActionType.CREATE_CONTACT_SUCCESS:
            console.log('CREATE_CONTACT_SUCCESS');
            let new_contacts = [...state.contacts];
            new_contacts.unshift(contactAction.payload);
            return {
                ...state,
                contacts: new_contacts,
                loading: false,
                notification: {text:'Contact Created'} as ActionNotification
            }
        case ContactActionType.UPDATE_CONTACT_SUCCESS:
            console.log('UPDATE_CONTACT_SUCCESS');
            var index = state.contacts.findIndex(item => item.id === contactAction.payload.id);
            let update_contacts = [...state.contacts];
            if (index != 0) {
                update_contacts[index] = contactAction.payload;
            }
            return {
                ...state,
                contacts: update_contacts,
                loading: false,
                notification: {isError: false, text:'Contact Updated'} as ActionNotification
            }
        case ContactActionType.ERROR:
            console.log('ERROR');
            let error = `${contactAction.error}`;
            console.log(contactAction.error)
            return {
                ...state,
                contacts: [],
                loading: false,
                notification: {isError: true, text: error } as ActionNotification
            }
        case ContactActionType.NAVIGATE_NEW_CONTACT_DETAILS:
            console.log('NAVIGATE_NEW_CONTACT_DETAILS');
            return {
                ...state,
                loading: false
            }
        case ContactActionType.ROUTE_NAVIGATION:
            let isNew = contactAction.id.toLowerCase() == 'new';
            return {
                ...state,
                isNew: isNew
            }
        default:
            return state;
    }
}
