/// <reference path="../res/script/ue4.d.ts" />
import { curry, has, keys } from 'ramda';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

const CallUE = ue4;

const RegisterForUpdates = (models) => {
    CallUE('RegisterForUpdates', keys(models));
};

const Updater = curry((models, snapshots) => {
    keys(snapshots)
        .filter((key: string) => has(key, models))
        .forEach((key) => {
            applySnapshot(models[key], snapshots[key]);
        });
});

const Initialize = (models) => {
    RegisterForUpdates(models);

    Object.assign(ue.interface, { Update: Updater(models) });

    Object.assign(window, {
        getSnapshot,
        applySnapshot,
        models,
    });

    CallUE('UiInitialized');
};

export default { Initialize };
