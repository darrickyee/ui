import { types, Instance } from 'mobx-state-tree';

export const DlgNode = types.model('DlgNode', {
    speaker: '',
    text: '',
    responses: types.array(types.string),
});

export type DlgNodeModel = Instance<typeof DlgNode>;
