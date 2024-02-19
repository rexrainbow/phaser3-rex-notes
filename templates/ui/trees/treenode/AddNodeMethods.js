import IsGameObject from '../../../../plugins/utils/system/IsGameObject';
import CreateNodeSizer from './CreateNodeSizer';
import SyncDisplayList from '../methods/SyncDisplayList';

export default {
    addSubTree(config) {
        var key;
        if (typeof (config) === 'string') {
            key = config;
            config = undefined;
        } else {
            key = config.key;
        }

        var subTree = this.createTree(config);
        SyncDisplayList(this, subTree);

        this.addNode(subTree, { expand: true, key: key });
        return subTree;
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
        if (!IsGameObject(gameObject)) {
            config = gameObject;
            gameObject = CreateNodeSizer(this.scene, this.configSave, { isLeaf: true });
        }

        if (typeof (config) === 'string') {
            config = { key: config };
        }

        this.removeNode(gameObject, false);

        gameObject.rexSizer.treeParent = this;

        var childrenSizer = this.childrenMap.child;
        childrenSizer.add(gameObject, config);

        return gameObject;
    },

    insertNode(index, gameObject, config) {
        if (!IsGameObject(gameObject)) {
            config = gameObject;
            gameObject = CreateNodeSizer(this.scene, this.configSave, { isLeaf: true });
        }

        if (typeof (config) === 'string') {
            config = { key: config };
        }

        this.removeNode(gameObject, false);

        gameObject.rexSizer.treeParent = this;

        var childrenSizer = this.childrenMap.child;
        childrenSizer.insert(index, gameObject, config);

        return gameObject;
    },
}