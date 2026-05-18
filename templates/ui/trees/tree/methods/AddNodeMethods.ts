import IsGameObject from '../../../../../plugins/utils/system/IsGameObject';
import Node from '../node/Node';
import SyncDisplayList from '../../methods/SyncDisplayList';

import { Utils as PhaserUtils } from 'phaser';
const UUID = PhaserUtils.String.UUID;

export default {
    addTree(config?: any, nodeKey?: any) {
        if (IsGameObject(config)) {
            var nodeBody = config;
            config = {
                nodeBody: nodeBody,
                nodeKey: nodeKey
            }
        }
        return this.insertTree(undefined, config);
    },

    insertTree(index?: any, config?: any) {
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

        var tree = this.createTree(config);
        SyncDisplayList(this, tree)

        this.insertNode(index, tree, { expand: true });

        // See Tree class
        tree._postAddCallback();

        return tree;
    },

    addNode(gameObject?: any, config?: any) {
        return this.insertNode(undefined, gameObject, config)
    },

    insertNode(index?: any, gameObject?: any, config?: any) {
        var nodeKey;

        if (!IsGameObject(gameObject)) {
            config = gameObject;
            gameObject = new Node(this.scene, this.configSave, { isLeaf: true });
        }

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

        if (config === undefined) {
            config = {}
        }

        if (!config.hasOwnProperty('expand')) {
            config.expand = true;
        }

        this.removeNode(gameObject, false);

        gameObject.rexSizer.treeParent = this;

        if (this.nodesMap.hasOwnProperty(nodeKey)) {
            console.error(`[Trees] Duplicate nodeKey '${nodeKey}'`);
            this.removeNode(this.nodesMap[nodeKey], true);
        }

        gameObject.nodeKey = nodeKey;
        this.nodesMap[nodeKey] = gameObject;

        var childrenSizer = this.childrenMap.child;
        childrenSizer.insert(index, gameObject, config);

        return gameObject;
    },
}