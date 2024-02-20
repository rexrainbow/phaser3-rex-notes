import IsGameObject from '../../../../plugins/utils/system/IsGameObject';
import Node from './Node.js';
import SyncDisplayList from '../methods/SyncDisplayList';

export default {
    addSubTree(config) {
        return this.insertSubTree(undefined, config);
    },

    insertSubTree(index, config) {
        var key;
        if (typeof (config) === 'string') {
            key = config;
            config = undefined;
        } else {
            key = config.key;
        }

        var subTree = this.createTree(config);
        SyncDisplayList(this, subTree)

        this.insertNode(index, subTree, { expand: true, key: key });
        return subTree;
    },

    addNode(gameObject, config) {
        return this.insertNode(undefined, gameObject, config)
    },

    insertNode(index, gameObject, config) {
        if (!IsGameObject(gameObject)) {
            config = gameObject;
            gameObject = new Node(this.scene, this.configSave, { isLeaf: true });
        }

        if (typeof (config) === 'string') {
            config = { key: config };
        }

        if (!config.hasOwnProperty('expand')) {
            config.expand = true;
        }

        this.removeNode(gameObject, false);

        gameObject.rexSizer.treeParent = this;

        var childrenSizer = this.childrenMap.child;
        childrenSizer.insert(index, gameObject, config);

        return gameObject;
    },
}