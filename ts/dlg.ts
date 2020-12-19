/// <reference path="../res/script/ue4.d.ts" />
import CORE from './core';
import { autorun } from 'mobx';
import { applySnapshot } from 'mobx-state-tree';
import { render, html } from 'lit-html';
import { DlgNodeModel, DlgNode } from './models';

const dialogue: DlgNodeModel = DlgNode.create({
    speaker: 'Bill',
    text: 'This is some text',
    responses: ['Ok.', 'Oh hell'],
});

const t_dlg_text = (text) => html`${text}`;
const t_dlg_speaker = (speaker) => html`${speaker}`;

const select = (i) => () => {
    console.log(`Selected option ${i}`);
    CORE.CallUE('Select', i);
};

const t_dlg_responses = (responses: Array<string>) =>
    html`${responses.map(
        (r, i) => html`<button @click=${select(i)} class="ue-btn-response">${r}</button>`
    )}`;

autorun(() => {
    render(t_dlg_speaker(dialogue.speaker), document.querySelector('#dlg-speaker'));
    render(t_dlg_text(dialogue.text), document.querySelector('#dlg-text'));
});

autorun(() => {
    render(t_dlg_responses(dialogue.responses), document.querySelector('#dlg-responses'));
});

CORE.Initialize((data) => {
    applySnapshot(dialogue, data);
});
