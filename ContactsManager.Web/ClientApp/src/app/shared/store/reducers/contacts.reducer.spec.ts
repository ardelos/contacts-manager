import { Contact } from "../../models/contact.model";
import { GetContactsAction, GetContactsSuccessAction, NewContactAction, UpdateContactSuccessAction } from "../actions/contacts.action";
import { AppState } from "../state/clients.state";
import { ContactsReducer } from "./contacts.reducers";


const initialState: AppState = { contacts: [], loading: false, contact: {} as Contact, isNew: false }


describe('loadingStatusChangeGetContacts', () => {
    it('should return loading true', () => {
        const loadContracts = new GetContactsAction();
        const newState = ContactsReducer(initialState, loadContracts);
        expect(newState.loading).toBe(true);
    });
});

describe('getContacts', () => {
    it('should populate entities from the array', () => {
        const contacts: Contact[] = [
            { id: 1, firstName: 'Name1', surname: 'Surname1', email: "text@email1.com", dateOfBirth: new Date(2000, 1, 1) },
            { id: 2, firstName: 'Name2', surname: 'Surname2', email: "text@email2.com", dateOfBirth: new Date(1970, 1, 1) },

        ];
        const entities: Contact[] = [contacts[0], contacts[1]]

        const state = ContactsReducer(initialState, new GetContactsSuccessAction(contacts));

        expect(state.loading).toEqual(false);
        expect(state.contacts).toEqual(entities);
    });
});

describe('newContact', () => {
    it('should create new contact', () => {
        const state = ContactsReducer(initialState, new NewContactAction());
        expect(state.loading).toEqual(false);
        expect(state.contact).toEqual({} as Contact);
    });
});

describe('update', () => {
    it('should update contact', () => {
        const contacts: Contact[] = [
            { id: 1, firstName: 'Name1', surname: 'Surname1', email: "text@email1.com", dateOfBirth: new Date(2000, 1, 1) },
            { id: 2, firstName: 'Name2', surname: 'Surname2', email: "text@email2.com", dateOfBirth: new Date(1970, 1, 1) },

        ];
        const state = ContactsReducer(initialState, new GetContactsSuccessAction(contacts));
        expect(state.contacts.length).toEqual(2);

        const updated_contact: Contact = { id: 2, firstName: 'NameX', surname: 'Surnamex', email: "text@emailx.com", dateOfBirth: new Date(2005, 1, 1) };
        const updated_state = ContactsReducer(state, new UpdateContactSuccessAction(updated_contact));

        expect(updated_state.contacts.length).toEqual(2);
        expect(updated_state.loading).toEqual(false);
        let index = updated_state.contacts.findIndex(c=>c.id == updated_contact.id)

        expect(updated_state.contacts[index].firstName).toEqual(updated_contact.firstName);
        expect(updated_state.contacts[index].surname).toEqual(updated_contact.surname);
        expect(updated_state.contacts[index].dateOfBirth).toEqual(updated_contact.dateOfBirth);
        expect(updated_state.contacts[index].email).toEqual(updated_contact.email);
    });
});