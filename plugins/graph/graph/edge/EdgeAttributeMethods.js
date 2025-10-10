import GetObjUID from '../../graphitem/GetObjUID.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    getEdgeAttribute(gameObject, key) {
        var edgeUID = GetObjUID(gameObject);

        if (key === undefined) {
            return this.graph.getEdgeAttributes(edgeUID);
        } else {
            return this.graph.getEdgeAttribute(edgeUID, key);
        }
    },

    setEdgeAttribute(gameObject, key, value) {
        var edgeUID = GetObjUID(gameObject);

        if (IsPlainObject(key)) {
            return this.graph.updateEdgeAttribute(edgeUID, key);
        } else {
            return this.graph.setEdgeAttribute(edgeUID, key, value);
        }
    },

    setEdgesAttribute(gameObjects, key, value) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.setEdgeAttribute(gameObjects[i], key, value);
        }

        return this;
    }
}