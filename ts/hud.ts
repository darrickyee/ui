/// <reference path="../res/script/ue4.d.ts" />
import { autorun, toJS } from 'mobx';
import { html, render } from 'lit-html';
import { pipe, multiply, mapObjIndexed, toPairs, keys } from 'ramda';
import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';
import * as T from './models/models';
import { TargetModel, LocationModel, PeriodModel } from './models/models';

declare namespace CORE {
    function Initialize(defaults: { [k: string]: any }, updater: (store) => () => void): void;
}

const initialState = {
    location: {
        level: 'Default Level',
        area: 'Default location',
    },

    target: {
        name: 'My Target',
        color: [1, 0, 0],
        interactions: [{ name: 'Talk', keys: ['E'] }],
    },

    period: { day: 'Monday', time: 'Afternoon' },
};

const t_location = ({ level, area }: LocationModel) =>
    html`<div>${level + (area ? `: ${area}` : '')}</div>`;

const t_target = ({ name, targetColor, interactions }: TargetModel) => html`
    <div id="name" style="color: ${targetColor};">${name}</div>
    <div id="actions">
        ${interactions
            ? interactions.map((act) => html` <div>[${act.keys.join(', ')}] ${act.name}</div> `)
            : html``}
    </div>
`;

const t_period = ({ day, time }: PeriodModel) =>
    html` <div>${day}${time ? html`: ${time}` : ''}</div> `;

const updater = (store) => () => {
    render(t_location(store.location), document.querySelector('#location'));
    render(t_target(store.target), document.querySelector('#target'));
    render(t_period(store.period), document.querySelector('#period'));
};

CORE.Initialize(initialState, updater);
