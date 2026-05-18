import GetObjUID from '../../graphitem/GetObjUID';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

export default {
    getNodeAttribute(gameObject?: any, key?: any) {
        var nodeUID = GetObjUID(gameObject);

        if (key === undefined) {
            return this.graph.getNodeAttributes(nodeUID);
        } else {
            return this.graph.getNodeAttribute(nodeUID, key);
        }
    },

    setNodeAttribute(gameObject?: any, key?: any, value?: any) {
        var nodeUID = GetObjUID(gameObject);

        if (IsPlainObject(key)) {
            var data = key;
            for (var key in data) {
                this.graph.setNodeAttribute(nodeUID, key, data[key]);
            }
        } else {
            this.graph.setNodeAttribute(nodeUID, key, value);
        }

        return this;
    },

    setNodesAttribute(gameObjects?: any, key?: any, value?: any) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.setNodeAttribute(gameObjects[i], key, value);
        }

        return this;
    }
}