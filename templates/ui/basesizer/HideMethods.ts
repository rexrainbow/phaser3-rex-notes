import {
    Show,
    Hide,
    IsShown,
} from '../utils/Hide';

export default {
    show(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Show(gameObject, false);
        return this;
    },

    hide(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Hide(gameObject, true);
        return this;
    },

    isShow(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return IsShown(gameObject);
    }
}