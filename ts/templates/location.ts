import { html } from 'lit-html';
import { toPairs } from 'ramda';

const toString = (obj: { [k: string]: number }) =>
    toPairs(obj)
        .map(([k, v]) => `${k}: ${(Math.round(v * 10) / 10).toFixed(1)}`)
        .join(', ');

const xform = ({ translation, rotation, scale }) =>
    html`<div>Translation: ${toString(translation.toJSON())}</div>
        <div>Rotation: ${toString(rotation.toJSON())}</div>
        <div>Scale: ${JSON.stringify(scale)}</div>`;

export default xform;
