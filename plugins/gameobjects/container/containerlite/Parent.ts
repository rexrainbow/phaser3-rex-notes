import { GetParent, GetTopmostParent } from './GetParent';
import GetLocalState from './utils/GetLocalState';

export default {
    setParent(gameObject?: any, parent?: any) {
        if (parent === undefined) {
            parent = this;
        }
        var localState = GetLocalState(gameObject);
        if (parent?: any) { // Add to parent
            localState.parent = parent;
            localState.self = gameObject;
        } else { // Remove from parent
            localState.parent = null;
            localState.self = null;
        }
        return this;
    },

    getParent(gameObject?: any, name?: any) {
        if (typeof (gameObject) === 'string') {
            name = gameObject;
            gameObject = undefined;
        }
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetParent(gameObject, name);
    },

    getTopmostParent(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetTopmostParent(gameObject);
    }
};