import { html } from 'lit-html';

const dlgtext = ({ speaker, text }) => html`
    ${text &&
    html`${speaker && html`<div id="speaker">${speaker}</div>`}
        <div id="text">${text}</div>`}
`;

export default dlgtext;
