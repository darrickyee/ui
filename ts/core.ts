/// <reference path="../res/script/ue4.d.ts" />
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

const CallUE = ue4;

const Initialize = (updater: (data: any) => void) => {
    Object.assign(ue.interface, { Update: updater });

    Object.assign(window, {
        getSnapshot,
        applySnapshot,
    });

    CallUE('OnInit');
};

export default { Initialize, CallUE };
