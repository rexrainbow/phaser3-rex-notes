import Tree from '../tree/Tree.js';
import IsGameObject from '../../../../plugins/utils/system/IsGameObject.js';
import SyncDisplayList from './SyncDisplayList.js';

const UUID = Phaser.Utils.String.UUID;

export default {
    addTree(config) {
        if (IsGameObject(config)) {
            var nodeBody = config;
            config = {
                nodeBody: nodeBody,
                nodeKey: nodeKey
            }
        }
        return this.insertTree(undefined, config);
    },

    insertTree(index, config) {
        var nodeKey;
        if (typeof (config) === 'string') {
            nodeKey = config;
            config = undefined;
        } else if (config) {
            nodeKey = config.nodeKey;
            delete config.nodeKey;
        }

        if (nodeKey === undefined) {
            nodeKey = UUID();
        }

        var tree = Tree.CreateTree(this.scene, this.treeConfig, config);
        SyncDisplayList(this, tree);

        tree.nodeKey = nodeKey;
        this.treesMap[nodeKey] = tree;

        this.insert(index, tree, { expand: true });

        // See Tree class
        tree._postAddCallback();

        return tree;
    }
}