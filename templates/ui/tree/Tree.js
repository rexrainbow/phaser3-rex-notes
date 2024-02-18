import TreeNode from './treenode/TreeNode.js';

class Tree extends TreeNode {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexTree';

    }
}

export default Tree;