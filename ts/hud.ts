/// <reference path="../res/script/ue4.d.ts" />
import { autorun } from 'mobx';
import { render, html } from 'lit-html';
import { dlgtext as t_dlgtext, target as t_target, location as t_xform } from './templates';
import { DlgText, Target, Transform, TargetModel, DlgNodeModel, DlgNode } from './models';

declare namespace CORE {
    function Initialize(models: { [k: string]: any }): void;
    function CallUE(name: string, data?: any): void;
}

const initialState = {
    location: {
        player: {
            level: 'Default Level',
            area: 'Default location',
        },
    },

    target: {
        name: '',
        color: [1, 0, 0],
        interactions: [],
    },

    period: { day: 'Monday', time: 'Afternoon' },

    dialogue: { speaker: 'Joe', text: 'Hello there!', responses: ['Ok.', 'Go fuck yourself.'] },
};

const target: TargetModel = Target.create(initialState.target);
const dialogue: DlgNodeModel = DlgNode.create(initialState.dialogue);
const xform = Transform.create({});

autorun(() => {
    render(t_target(target), document.querySelector('#target'));
});

// autorun(() => {
//     render(t_xform(xform), document.querySelector('#xform'));
// });

const select = (option: number) => () => {
    console.log(`Selected option ${option}`);
    CORE.CallUE('SelectOption', option);
};

const t_dlgresponses = ({ responses }: DlgNodeModel) =>
    html`
        ${responses.map(
            (r, i) => html`<button class="response-button" @click=${select(i)}>${r}</button>`
        )}
    `;

autorun(() => {
    render(t_dlgtext(dialogue), document.querySelector('#dlgtext'));
    render(t_dlgresponses(dialogue), document.querySelector('#dlgresponses'));
});

CORE.Initialize({ target, xform, dialogue });

Object.assign(window, { Transform });
