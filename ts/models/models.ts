import { keys, pick } from 'ramda';
import { parseColor } from '../lib/util';
import { types, Instance, applySnapshot, getSnapshot } from 'mobx-state-tree';

const DisplayName = types.model('Name', {
    text: '',
    color: types.array(types.number),
});

const DefaultActions = types.model({}).actions((self) => ({
    reset(obj = {}) {
        applySnapshot(self, obj);
    },
    update(obj) {
        const props = pick(keys<{ [k: string]: any }>(getSnapshot(self)) as string[], obj);
        keys(props).forEach((k) => (self[k] = props[k]));
    },
    setprop(prop, value) {
        self[prop] = value;
    },
}));

export const Interaction = types.compose(
    types.model('Interaction', {
        name: '',
        keys: types.optional(types.array(types.string), []),
    }),
    DefaultActions
);

export const Target = types.compose(
    types
        .model('Target', {
            name: '',
            color: types.optional(types.array(types.number), [1, 1, 1]),
            interactions: types.optional(types.array(Interaction), []),
        })
        .views((self) => ({
            get targetColor() {
                return parseColor(self.color);
            },
        })),
    DefaultActions
);

export const Location = types.compose(
    types.model('Location', { level: '', area: '' }),
    DefaultActions
);

export const Period = types.compose(types.model('Period', { day: '', time: '' }), DefaultActions);

export const ActionTypes = { DefaultActions };

export const DlgText = types.model('DlgText', { speaker: '', text: '' });

export type InteractionModel = Instance<typeof Interaction>;
export type TargetModel = Instance<typeof Target>;
export type LocationModel = Instance<typeof Location>;
export type PeriodModel = Instance<typeof Period>;
export type DefaultActionsModel = Instance<typeof DefaultActions>;
