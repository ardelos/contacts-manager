import { Contact } from "../../models/contact.model";
import { ActionNotification } from "../../models/notification.model";

export interface AppState {
  contacts: Contact[];
  contact: Contact;
  loading : boolean ;
  isNew : boolean;
  notification : ActionNotification | undefined
}