import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

// TODO extend from TreeNode
class Trees extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTrees';

        this.treeConfig = GetValue(config, 'tree');
    }

}

Object.assign(
    Trees.prototype,
    Methods
)

export default Trees;