import { keys, pick, toPairs } from 'ramda';
import { parseColor } from '../lib/util';
import { types, Instance, applySnapshot, getSnapshot } from 'mobx-state-tree';

const DisplayName = types.model('Name', {
    text: '',
    color: types.array(types.number),
});

export const Vector = types
    .model('Vector', {
        x: 0.0,
        y: 0.0,
        z: 0.0,
    })
    .actions((self) => ({
        setComponent(value: number, axis: 'x' | 'y' | 'z') {
            self[axis] = value;
        },
        setValue(value: [number, number, number]) {
            self.x = value[0];
            self.y = value[1];
            self.z = value[2];
        },
    }));

const rot_axis_map = {
    x: 'roll',
    y: 'pitch',
    z: 'yaw',
};

export const Rotation = types
    .model('Rotation', {
        roll: 0.0,
        pitch: 0.0,
        yaw: 0.0,
    })
    .actions((self) => ({
        setComponent(value: number, axis: 'roll' | 'pitch' | 'yaw' | 'x' | 'y' | 'z') {
            if (['x', 'y', 'z'].includes(axis)) axis = rot_axis_map[axis];
            self[axis] = value;
        },
        setValue(value: [number, number, number]) {
            self.roll = value[0];
            self.pitch = value[1];
            self.yaw = value[2];
        },
    }));

export const Transform = types
    .model('Transform', {
        translation: types.optional(Vector, {}),
        rotation: types.optional(Rotation, {}),
        scale: types.optional(Vector, {}),
    })
    .actions((self) => {
        function setComponent(
            component: 'translation' | 'rotation' | 'scale',
            value: [number, number, number] | number,
            axis: 'x' | 'y' | 'z' | 'roll' | 'pitch' | 'yaw' = null
        ) {
            // @ts-ignore
            if (axis) self[component].setComponent(value as number, axis);
            else self[component].setValue(value as [number, number, number]);
        }

        return {
            setTranslation(value: [number, number, number] | number, axis: 'x' | 'y' | 'z' = null) {
                setComponent('translation', value, axis);
            },
            setRotation(
                value: [number, number, number] | number,
                axis: 'x' | 'y' | 'z' | 'roll' | 'pitch' | 'yaw' = null
            ) {
                setComponent('rotation', value, axis);
            },
            setScale(value: [number, number, number] | number, axis: 'x' | 'y' | 'z' = null) {
                setComponent('scale', value, axis);
            },
        };
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

export type VectorModel = Instance<typeof Vector>;
export type RotationModel = Instance<typeof Rotation>;
export type TransformModel = Instance<typeof Transform>;

export type InteractionModel = Instance<typeof Interaction>;
export type TargetModel = Instance<typeof Target>;
export type LocationModel = Instance<typeof Location>;
export type PeriodModel = Instance<typeof Period>;
export type DefaultActionsModel = Instance<typeof DefaultActions>;
