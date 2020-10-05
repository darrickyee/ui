import { html } from 'lit-html';

const target = ({ name, targetColor, interactions }) => html`
    <div id="name" style="color: ${targetColor};">${name}</div>
    <div id="actions">
        ${interactions
            ? interactions.map((act) => html` <div>[${act.keys.join(', ')}] ${act.name}</div> `)
            : html``}
    </div>
`;

export default target;
