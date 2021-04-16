import {
    Show,
    Hide,
    IsShown,
} from '../utils/Hide.js';

export default {
    show(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Show(gameObject, false);
        return this;
    },

    hide() {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Hide(gameObject, true);
        return this;
    },

    isShow() {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return IsShown(gameObject);
    }
}