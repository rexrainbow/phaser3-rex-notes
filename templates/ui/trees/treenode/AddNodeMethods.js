import IsGameObject from '../../../../plugins/utils/system/IsGameObject';

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
        this.syncDisplayList(subTree);

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
        this.syncDisplayList(subTree);

        this.insertNode(index, subTree, { expand: true, key: key });
        return subTree;
    },

    addNode(gameObject, config) {
        if (!IsGameObject(gameObject)) {
            config = gameObject;

            var callback = this.configSave.node;
            if (callback) {
                gameObject = callback(this.scene, { isLeaf: true });
            } else {
                // error
                return this;
            }
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

            var callback = this.configSave.node;
            if (callback) {
                gameObject = callback(this.scene, { isLeaf: true });
            } else {
                // error
                return this;
            }
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