import IndexOf from '../../../plugins/utils/object/IndexOf.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

export default {
    setChildVisible(child, visible) {
        // moveChild during constructor
        if (this.currentChildKey === undefined) {
            return this;
        }

        var key;
        if (typeof (child) === 'string') {
            var key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (visible === undefined) {
            visible = (this.currentChildKey === key) ? true : false;
        }
        child.setVisible(visible);
        return this;
    },

    fadeChild(child, duration, alpha) {
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
            duration = 500;
        }
        if (alpha === undefined) {
            alpha = (this.currentChildKey === key) ? 1 : 0;
        }

        child.fadeIn(duration, { start: child.alpha, end: alpha });
        return this;
    },

    moveChild(child, duration, ease, distance) {
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
            duration = 500;
        }

        var isShownChild = (this.currentChildKey === key);

        if (distance === undefined) {
            switch (key) {
                case 'leftSide':
                case 'rightSide':
                    distance = GetDisplayWidth(child);
                    break;
                case 'topSide':
                case 'bottomSide':
                    distance = GetDisplayHeight(child);
                    break;
                default: // 'panel'
                    if (isShownChild) {
                        var previousChild = this.sizerChildren[this.previousChildKey];
                        switch (this.previousChildKey) {
                            case 'leftSide':
                            case 'rightSide':
                                distance = GetDisplayWidth(previousChild);
                                break;
                            case 'topSide':
                            case 'bottomSide':
                                distance = GetDisplayHeight(previousChild);
                                break;
                        }
                    } else {
                        var currentChild = this.sizerChildren[this.currentChildKey];
                        switch (this.currentChildKey) {
                            case 'leftSide':
                            case 'rightSide':
                                distance = GetDisplayWidth(currentChild);
                                break;
                            case 'topSide':
                            case 'bottomSide':
                                distance = GetDisplayHeight(currentChild);
                                break;
                        }
                    }
                    break;
            }
        }

        var moveLeft, moveRight, moveUp, moveDown;
        if (isShownChild) {
            switch (key) {
                case 'panel':
                    switch (this.previousChildKey) {
                        case 'leftSide':
                            moveLeft = true;
                            break;
                        case 'rightSide':
                            moveRight = true;
                            break;
                        case 'topSide':
                            moveUp = true;
                            break;
                        case 'bottomSide':
                            moveDown = true;
                            break;
                    }
                    break;
                case 'leftSide':
                    moveRight = true;
                    break;
                case 'rightSide':
                    moveLeft = true;
                    break;
                case 'topSide':
                    moveDown = true;
                    break;
                case 'bottomSide':
                    moveUp = true;
                    break;
            }
        } else { // Hide
            switch (key) {
                case 'panel':
                    switch (this.currentChildKey) {
                        case 'leftSide':
                            moveRight = true;
                            break;
                        case 'rightSide':
                            moveLeft = true;
                            break;
                        case 'topSide':
                            moveDown = true;
                            break;
                        case 'bottomSide':
                            moveUp = true;
                            break;
                    }
                    break;
                case 'leftSide':
                    moveLeft = true;
                    break;
                case 'rightSide':
                    moveRight = true;
                    break;
                case 'topSide':
                    moveUp = true;
                    break;
                case 'bottomSide':
                    moveDown = true;
                    break;
            }
        }

        if (moveLeft) {
            child.moveTo(duration, `-=${distance}`, undefined, ease);
        } else if (moveRight) {
            child.moveTo(duration, `+=${distance}`, undefined, ease);
        } else if (moveUp) {
            child.moveTo(duration, undefined, `-=${distance}`, ease);
        } else if (moveDown) {
            child.moveTo(duration, undefined, `+=${distance}`, ease);
        }
        return this;
    }
}