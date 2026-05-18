import IndexOf from '../../../../plugins/utils/object/IndexOf';
import { WaitComplete } from '../../utils/WaitEvent';

export default {
    fadeChild(child?: any, duration?: any, alpha?: any) {
        var key;
        if (typeof (child) === 'string') {
            key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (duration === undefined) {
            duration = 500;
        }
        if (alpha === undefined) {
            alpha = (this.currentChildKey === key) ? 1 : 0;
        }

        child.fadeIn(duration, { start: child.alpha, end: alpha });
        return this;
    },

    fadeChildPromise(child?: any, duration?: any, alpha?: any) {
        if (typeof (child) === 'string') {
            child = this.sizerChildren[key];
        }
        this.fadeChild(child, duration, alpha);

        if (child._fade) {
            return WaitComplete(child._fade);
        } else {
            return Promise.resolve();
        }
    }
}