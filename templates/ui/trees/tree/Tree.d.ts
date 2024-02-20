import Folder from '../../folder/Folder';
import Sizer from '../../sizer/Sizer';
export default Tree;

declare namespace Tree {
    type GameObjectType = (scene: Phaser.Scene, data: Object) => Phaser.GameObjects.GameObject |
        Phaser.GameObjects.GameObject;

    interface ISpaceConfig extends Folder.ISpaceConfig {
        indent?: number,
        indentLeft?: number, indentRight?: number, indentTop?: number, indentBottom?: number,

        nodeLeft?: number, nodeRight?: number, nodeTop?: number, nodeBottom?: number,
        toggleButton?: number,
    }

    interface IConfig {
        background?: GameObjectType,
        toggleButton?: GameObjectType,
        nodeBackground?: GameObjectType,
        nodeBody?: GameObjectType,

        transition: Folder.ITransitionConfig,

        orientation?: Sizer.OrientationTypes,
        space?: ISpaceConfig,
        align?: Folder.IAlignConfig,
        expand?: Folder.IExpandConfig,
    }

    interface IAddTreeConfig extends IConfig {
        key: string
    }

}

declare class Tree extends Folder {
    constructor(
        scene: Phaser.Scene,
        config?: Tree.IConfig
    );

    readonly nodesMap: { [nodeKey: string]: Phaser.GameObjects.GameObject };

    addTree(
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    insertTree(
        index: number,
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    addNode(
        config?: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    insertNode(
        index: number,
        config?: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    getNode(
        key: string
    ): Phaser.GameObjects.GameObject;

    getNodes(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getAllNodes(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getTreePatent(
        gameObject?: Phaser.GameObjects.GameObject
    ): Tree | null | undefined;

    getTreeRoot(
        gameObject?: Phaser.GameObjects.GameObject
    ): Tree | null | undefined;

    isGrandsonNode(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    removeNode(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAllNodes(
        destroyChild?: boolean
    ): this;
}