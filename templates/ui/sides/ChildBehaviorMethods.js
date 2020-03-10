import IndexOf from '../../../plugins/utils/object/IndexOf.js';

export default {
    setChildVisible(child, visible) {
        if (typeof (child) === 'string') {
            var key = child;
            child = this.sizerChildren[key];
        }
        child.setVisible(visible);
        return this;
    },

    fadeChild(child, duration, alpha) {
        var key;
        if (typeof (child) === 'string') {
            key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (duration === undefined) {
            duration = 1000;
        }
        if (alpha === undefined) {
            alpha = (this.currentChildKey === key) ? 1 : 0;
        }
        
    },

    moveChild(child, duration) {
        // moveChild during constructor
        if (this.currentChildKey === undefined) {
            return this;
        }

        var key;
        if (typeof (child) === 'string') {
            key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (duration === undefined) {
            duration = 1000;
        }
        var isShownChild = (this.currentChildKey === key);

        switch (key) {
            case 'panel':
                if (isShownChild) {

                } else {

                }
                break;
            case 'leftSide':
                break;
            case 'rightSide':
                break;
            case 'topSide':
                break;
            case 'bottomSide':
                break;
        }

        return this;
    }
}