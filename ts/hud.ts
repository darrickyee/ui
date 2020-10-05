/// <reference path="../res/script/ue4.d.ts" />
import { autorun } from 'mobx';
import { applySnapshot } from 'mobx-state-tree';
import { render } from 'lit-html';
import { dlgtext as t_dlgtext, target as t_target, location as t_xform } from './templates';
import { DlgText, Target, Transform, TargetModel } from './models/models';

declare namespace CORE {
    function Initialize(models: { [k: string]: any }): void;
}

const initialState = {
    location: {
        level: 'Default Level',
        area: 'Default location',
    },

    target: {
        name: '',
        color: [1, 0, 0],
        interactions: [],
    },

    period: { day: 'Monday', time: 'Afternoon' },
};

const target: TargetModel = Target.create(initialState.target);
const xform = Transform.create({});
const dlgtext = DlgText.create({});

autorun(() => {
    render(t_target(target), document.querySelector('#target'));
});

autorun(() => {
    render(t_xform(xform), document.querySelector('#xform'));
});

autorun(() => {
    render(t_dlgtext(dlgtext), document.querySelector('#dlgtext'));
});

CORE.Initialize({ dlgtext, target, xform });
