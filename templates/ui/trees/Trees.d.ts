import Sizer from '../sizer/Sizer';
import Tree from './tree/Tree';
export default Trees;

declare namespace Trees {
    interface IConfig extends Sizer.IConfig {
        tree: Tree.IConfig,
    }
}

declare class Trees extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Trees.IConfig
    );

    addTree(
        config?: Tree.IAddTreeConfig | string
    ): Tree;
}