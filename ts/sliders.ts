/// <reference path="../res/script/ue4.d.ts" />
import { autorun } from 'mobx';
import { render, html } from 'lit-html';
import { Transform, VectorModel } from './models';
import { UeSlider } from 'ue-elems';

customElements.define('ue-slider', UeSlider);

declare namespace CORE {
    function Initialize(models: { [k: string]: any }): void;
}

const initialState = {
    slider: {
        translation: { x: 0, y: 10, z: 20 },
        rotation: { roll: 0, pitch: 45, yaw: 90 },
        scale: { x: 1, y: 1, z: 1 },
    },
};

const xform = Transform.create(initialState.slider);

const sldrgrp = (vec: VectorModel) =>
    html`${Object.keys(vec).map(
        (k: 'x' | 'y' | 'z') =>
            html`
                <div class="slider-div" style="display: flex; align-items: center;">
                    ${k}:
                    <ue-slider
                        style="width: 40vw;"
                        @change=${(e) => {
                            vec.setValue(e.detail.value, k);
                        }}
                        .value=${vec[k]}
                    ></ue-slider>
                    <input
                        type="number"
                        .value=${vec[k].toFixed(2)}
                        @input=${(e) => {
                            vec.setValue(k, parseFloat(e.target.value));
                        }}
                    />
                </div>
            `
    )}`;

const tpl = (xform) =>
    html`${Object.keys(xform).map((comp) => html`${comp}: ${sldrgrp(xform[comp])}`)}`;

autorun(() => {
    render(tpl(xform), document.querySelector('#slider-host'));
});

CORE.Initialize({ xform });
