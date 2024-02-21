import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

// TODO extend from TreeNode
class Trees extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 'y';
        }

        super(scene, config);
        this.type = 'rexTrees';

        this.treesMap = {};

        this.treeConfig = GetValue(config, 'tree');
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.treeConfig = undefined;

        Clear(this.treesMap);
        this.treesMap = undefined;

        super.destroy(fromScene);
    }

}

Object.assign(
    Trees.prototype,
    Methods
)

export default Trees;