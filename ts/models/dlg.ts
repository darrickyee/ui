import { types, Instance } from 'mobx-state-tree';

export const DlgNode = types.model('DlgNode', {
    speaker: '',
    color: types.optional(types.array(types.number), [1, 1, 1, 1]),
    text: '',
    responses: types.array(types.string),
});

export type DlgNodeModel = Instance<typeof DlgNode>;
