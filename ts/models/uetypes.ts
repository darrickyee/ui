import { types, Instance } from 'mobx-state-tree';
import { has } from 'ramda';

const arrayMapper = (props: string[] = []) =>
    types
        .model({})
        .views((self) => ({
            toArray() {
                return props.map((p) =>
                    has('toArray', self[p])
                        ? self[p].toArray()
                        : has('toJSON', self[p])
                        ? self[p].toJSON()
                        : self[p]
                );
            },
        }))
        .actions((self) => ({
            fromArray(arr: any[]) {
                props.forEach((p, i) => {
                    self['setValue'](p, arr[i]);
                });
            },
        }));

const propSetter = <T>(base: T) =>
    types.model({}).actions((self: Instance<T>) => ({
        setValue(prop: keyof Instance<T>, value) {
            if (Array.isArray(value) && has('fromArray', self[prop]))
                self[prop]['fromArray'](value);
            else self[prop] = value;
        },
    }));

const VectorBase = types.model({ x: 0.0, y: 0.0, z: 0.0 });

const RotationBase = types.model({ roll: 0.0, pitch: 0.0, yaw: 0.0 });

export const Vector = types.compose(
    'Vector',
    VectorBase,
    arrayMapper(['x', 'y', 'z']),
    propSetter(VectorBase)
);

export const Rotation = types.compose(
    'Rotation',
    RotationBase,
    arrayMapper(['roll', 'pitch', 'yaw']),
    propSetter(RotationBase)
);

const TransformBase = types.model('Transform', {
    translation: types.optional(Vector, {}),
    rotation: types.optional(Rotation, {}),
    scale: types.optional(Vector, {}),
});

export const Transform = types.compose(
    'Transform',
    TransformBase,
    arrayMapper(['translation', 'rotation', 'scale']),
    propSetter(TransformBase)
);

export type VectorModel = Instance<typeof Vector>;
export type RotationModel = Instance<typeof Rotation>;
export type TransformModel = Instance<typeof Transform>;
