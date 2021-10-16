import { Action } from '@ngrx/store';
import { ContactActionType } from '../../models/contact.action.model';
import { Contact } from '../../models/contact.model';
import { StoreActions } from '../actions/contacts.action';
import { AppState } from '../state/clients.state';

export const initialState: AppState = { contacts: [], loading: false, contact: {} as Contact, isNew: false }

export function ContactsReducer(state: AppState = initialState, action: Action): AppState {
    const contactAction = action as StoreActions;

    switch (contactAction.type) {

        case ContactActionType.GET_CONTACTS:
            console.log('GET_CONTACTS');
            return {
                ...state,
                loading: true
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
                loading: true
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
                loading: false
            }
        case ContactActionType.CREATE_CONTACT_SUCCESS:
            console.log('CREATE_CONTACT_SUCCESS');
            let new_contacts = [...state.contacts];
            new_contacts.unshift(contactAction.payload);
            return {
                ...state,
                contacts: new_contacts,
                loading: false
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
                loading: false
            }
        case ContactActionType.ERROR:
            console.log('ERROR');
            return {
                ...state,
                contacts: [],
                loading: false
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
