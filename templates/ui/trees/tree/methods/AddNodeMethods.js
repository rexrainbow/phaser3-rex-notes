import IsGameObject from '../../../../../plugins/utils/system/IsGameObject.js';
import Node from '../Node.js';
import SyncDisplayList from '../../methods/SyncDisplayList.js';

const UUID = Phaser.Utils.String.UUID;

export default {
    addTree(config) {
        return this.insertTree(undefined, config);
    },

    insertTree(index, config) {
        var key;
        if (typeof (config) === 'string') {
            key = config;
            config = undefined;
        } else {
            key = config.key;
        }

        if (key === undefined) {
            key = UUID();
        }

        var tree = this.createTree(config);
        SyncDisplayList(this, tree)

        this.insertNode(index, tree, { expand: true, key: key });
        return tree;
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
        } else if (!config) {
            config = {};
        }

        if (!config.hasOwnProperty('key')) {
            config.key = UUID();
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