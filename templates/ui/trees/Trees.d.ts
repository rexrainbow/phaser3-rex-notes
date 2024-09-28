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

    addTree(): Tree;

    addTree(
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    insertTree(
        index: number,
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    removeTree(
        tree: Tree | string,
        destroyChild?: boolean
    ): this;

    removeAllTrees(
        destroyChild?: boolean
    ): this;

    getTree(
        nodeKey: string
    ): Tree;

    getTrees(
        out?: Phaser.GameObjects.GameObject[]
    ): Tree[];

    getNode(
        nodeKey: string
    ): Phaser.GameObjects.GameObject;

}