import InTouching from '../intouching/InTouching';
import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds';

export default {
    isPointerInBounds(target?: any) {
        if (target === undefined) {
            target = this;
        } else if (typeof (target) === 'string') {
            target = this.getElement(target);
        }

        if (!target) {
            return false;
        }

        return IsPointerInBounds(target);
    },

    onTouching(gameObject?: any, callback?: any, scope?: any, config?: any) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            gameObject._inTouching = new InTouching(gameObject, config);
        }
        gameObject._inTouching.on('intouch', callback, scope);

        return this;
    },

    offTouching(gameObject?: any, callback?: any, scope?: any) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.off('intouch', callback, scope);

        return this;
    },

    onTouchingEnd(gameObject?: any, callback?: any, scope?: any, config?: any) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            gameObject._inTouching = new InTouching(gameObject, config);
        }
        gameObject._inTouching.on('touchend', callback, scope);

        return this;
    },

    offTouchingEnd(gameObject?: any, callback?: any, scope?: any) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.off('touchend', callback, scope);

        return this;
    },


    enableTouching(gameObject?: any, enabled?: any) {
        if (typeof (gameObject) === 'boolean') {
            enabled = gameObject;
            gameObject = undefined;
        }

        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.setEnable(enabled);

        return this;
    },

    disableTouching(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.setEnable(false);

        return this;
    },


}