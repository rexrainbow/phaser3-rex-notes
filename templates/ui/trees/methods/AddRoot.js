import Merge from './Merge.js';
import Tree from '../tree/Tree.js';
import SyncDisplayList from './SyncDisplayList.js';

var AddRoot = function (config) {
    var key;
    if (typeof (config) === 'string') {
        key = config;
        config = undefined;
    } else {
        key = config.key;
    }

    var tree = new Tree(this.scene, Merge(this.treeConfig, config));
    SyncDisplayList(this, tree);

    this.add(tree, { expand: true, key: key });

    return tree;
}

export default AddRoot;