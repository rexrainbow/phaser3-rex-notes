import Merge from './Merge.js';
import TreeNode from '../treenode/TreeNode.js';
import SyncDisplayList from './SyncDisplayList.js';

var AddRoot = function (config) {
    var key;
    if (typeof (config) === 'string') {
        key = config;
        config = undefined;
    } else {
        key = config.key;
    }

    var tree = new TreeNode(this.scene, Merge(this.treeConfig, config));
    SyncDisplayList(this, tree);

    this.add(tree, { expend: true, key: key });

    return tree;
}

export default AddRoot;