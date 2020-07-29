import { pipe, multiply } from 'ramda';

/**
 * Adds an event listener to `target` and returns the associated `removeEventListener` function.
 *
 * @example
 *
 * // Add listener to document
 * const unlisten = listen(document, 'click', () => console.log('clicked'))
 *
 * // Remove listener
 * unlisten();
 *
 * @param target EventTarget to which the listener will be added.
 * @param type Passed to `addEventListener`.
 * @param listener Passed to `addEventListener`.
 * @param options Passed to `addEventListener`.
 *
 * @returns Function that removes the listener when called.
 */
export const listen = (
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
) => {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
};

const clamp = (min, max) => (num) => Math.max(min, Math.min(num, max));

const floatToColor = pipe(multiply(255), clamp(0, 255), Math.round);

export function parseColor(color?: Array<number> | string) {
    if (color instanceof Array) {
        const rgb = color.slice(0, 3).map(floatToColor);
        return color.length > 3
            ? `rgba(${[...rgb, color[3]].toString()})`
            : `rgb(${rgb.toString()})`;
    }
    return color || '';
}
