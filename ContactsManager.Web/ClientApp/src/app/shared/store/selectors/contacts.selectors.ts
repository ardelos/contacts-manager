import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "../state/contacts.state";

const getAppState = createFeatureSelector<AppState>('appstate');

export const getClients = createSelector(
    getAppState,
    state => state.contacts
);

export const getClient = createSelector(
    getAppState,
    state => state.contact
);

export const loading = createSelector(
    getAppState,
    state => state.loading
);

export const isNew = createSelector(
    getAppState,
    state => state.isNew
);

export const getNotification = createSelector(
    getAppState,
    state => state.notification
);