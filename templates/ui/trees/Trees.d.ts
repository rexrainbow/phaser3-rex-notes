import Sizer from '../sizer/Sizer';
import Tree from './tree/Tree';
export default Trees;

declare namespace Trees {
    /**
     * Configuration options for creating a trees container.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Base tree configuration used when creating tree items.
         */
        tree: Tree.IConfig,
    }
}

/**
 * Sizer container that manages a list of tree components.
 */
declare class Trees extends Sizer {
    /**
     * Create a trees container.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional trees configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Trees.IConfig
    );

    /**
     * Add a tree using default configuration.
     *
     * @returns Created tree instance.
     */
    addTree(): Tree;

    /**
     * Add a tree with custom config or node key.
     *
     * @param config - Tree config or node key string.
     * @returns Created tree instance.
     */
    addTree(
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    /**
     * Insert a tree at target index.
     *
     * @param index - Insertion index.
     * @param config - Tree config or node key string.
     * @returns Created tree instance.
     */
    insertTree(
        index: number,
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    /**
     * Remove a tree by instance or node key.
     *
     * @param tree - Tree instance or node key.
     * @param destroyChild - Set to true to destroy removed tree object.
     * @returns This component instance.
     */
    removeTree(
        tree: Tree | string,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all trees.
     *
     * @param destroyChild - Set to true to destroy removed tree objects.
     * @returns This component instance.
     */
    removeAllTrees(
        destroyChild?: boolean
    ): this;

    /**
     * Get a tree by node key.
     *
     * @param nodeKey - Node key of tree root.
     * @returns Matched tree instance.
     */
    getTree(
        nodeKey: string
    ): Tree;

    /**
     * Get all trees.
     *
     * @param out - Optional output array.
     * @returns Tree list.
     */
    getTrees(
        out?: Phaser.GameObjects.GameObject[]
    ): Tree[];

    /**
     * Get a node game object by node key.
     *
     * @param nodeKey - Node key.
     * @returns Matched node game object.
     */
    getNode(
        nodeKey: string
    ): Phaser.GameObjects.GameObject;

}
