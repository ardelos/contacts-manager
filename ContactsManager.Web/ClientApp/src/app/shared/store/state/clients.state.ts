import { Contact } from "../../models/contact.model";

export interface AppState {
  contacts: Contact[];
  contact: Contact;
  loading : boolean 
  isNew : boolean
}