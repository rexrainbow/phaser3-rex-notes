import GetObjUID from '../../graphitem/GetObjUID.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    getNodeAttribute(gameObject, key) {
        var nodeUID = GetObjUID(gameObject);

        if (key === undefined) {
            return this.graph.getNodeAttributes(nodeUID);
        } else {
            return this.graph.getNodeAttribute(nodeUID, key);
        }
    },

    setNodeAttribute(gameObject, key, value) {
        var nodeUID = GetObjUID(gameObject);

        if (IsPlainObject(key)) {
            return this.graph.updateNodeAttribute(nodeUID, key);
        } else {
            return this.graph.setNodeAttribute(nodeUID, key, value);
        }
    }
}