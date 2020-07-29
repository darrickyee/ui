/// <reference path="../res/script/ue4.d.ts" />
import { autorun } from 'mobx';
import { curry, has, mapObjIndexed, map, keys, pick, intersection } from 'ramda';
import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';
import { ModelTypes, ActionTypes } from './models/models';

const SendEvent = ue.interface.broadcast;

const Initialize = (initialState, updater: (store) => () => void) => {
    const store = types
        .model(
            'Root',
            mapObjIndexed((_, key) => ModelTypes[key], initialState)
        )
        .actions((self) => ({
            reset(obj = {}) {
                keys(self).forEach((k) => self[k].reset && self[k].reset(obj[k] || {}));
            },
            update(obj) {
                intersection(keys(self), keys(obj)).forEach((k: string) => {
                    self[k].update && self[k].update(obj[k]);
                });
            },
        }))
        .create(initialState);

    autorun(updater(store));

    Object.assign(window, {
        store,
        getSnapshot,
        applySnapshot,
        setState: store.reset,
        updateState: store.update,
    });

    Object.assign(ue.interface, { SetState: store.reset, UpdateState: store.update });

    SendEvent('UiInitialized');
};

export default { Initialize };
