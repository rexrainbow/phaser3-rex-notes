import Sizer from '../sizer/Sizer';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

// TODO extend from TreeNode
class Trees extends Sizer {
    ignoreDestroy: any;
    scene: any;
    treeConfig: any;
    treesMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

    destroy(fromScene?: any) {
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