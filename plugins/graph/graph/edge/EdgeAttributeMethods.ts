import GetObjUID from '../../graphitem/GetObjUID';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

export default {
    getEdgeAttribute(gameObject?: any, key?: any) {
        var edgeUID = GetObjUID(gameObject);

        if (key === undefined) {
            return this.graph.getEdgeAttributes(edgeUID);
        } else {
            return this.graph.getEdgeAttribute(edgeUID, key);
        }
    },

    setEdgeAttribute(gameObject?: any, key?: any, value?: any) {
        var edgeUID = GetObjUID(gameObject);

        if (IsPlainObject(key)) {
            return this.graph.updateEdgeAttribute(edgeUID, key);
        } else {
            return this.graph.setEdgeAttribute(edgeUID, key, value);
        }
    },

    setEdgesAttribute(gameObjects?: any, key?: any, value?: any) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.setEdgeAttribute(gameObjects[i], key, value);
        }

        return this;
    }
}