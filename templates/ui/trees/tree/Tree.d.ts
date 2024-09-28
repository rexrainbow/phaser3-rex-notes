import Folder from '../../folder/Folder';
import Sizer from '../../sizer/Sizer';
import Trees from '../Trees';
import Node from './node/Node';
import Triangle from '../../triangle/Triangle';
import SimpleLabel from '../../simplelabel/SimpleLabel';
export default Tree;

declare namespace Tree {
    interface ICreateGameObjectData {
        isLeaf?: boolean,
    }

    type CreateGameObjectCallbackType = (scene: Phaser.Scene, data: ICreateGameObjectData) => Phaser.GameObjects.GameObject;

    interface ISpaceConfig extends Folder.ISpaceConfig {
        indent?: number,
        indentLeft?: number, indentRight?: number, indentTop?: number, indentBottom?: number,

        nodeLeft?: number, nodeRight?: number, nodeTop?: number, nodeBottom?: number,
        toggleButton?: number,
    }

    interface IConfig {
        background?: CreateGameObjectCallbackType,
        toggleButton?: CreateGameObjectCallbackType | Triangle.IConfig,
        nodeBackground?: CreateGameObjectCallbackType,
        nodeBody?: CreateGameObjectCallbackType | SimpleLabel.IConfig,

        transition: Folder.ITransitionConfig,

        orientation?: Sizer.OrientationTypes,
        space?: ISpaceConfig,
        align?: Folder.IAlignConfig,
        expand?: Folder.IExpandConfig,

        expanded?: boolean,
    }

    interface IAddTreeConfig {
        background?: CreateGameObjectCallbackType | Phaser.GameObjects.GameObject,
        toggleButton?: CreateGameObjectCallbackType | Triangle.IConfig | Phaser.GameObjects.GameObject,
        nodeBackground?: CreateGameObjectCallbackType | Phaser.GameObjects.GameObject,
        nodeBody?: CreateGameObjectCallbackType | SimpleLabel.IConfig | Phaser.GameObjects.GameObject,

        transition: Folder.ITransitionConfig,

        orientation?: Sizer.OrientationTypes,
        space?: ISpaceConfig,
        align?: Folder.IAlignConfig,
        expand?: Folder.IExpandConfig,

        expanded?: boolean,

        nodeKey?: string,
    }

}

declare class Tree extends Folder {
    constructor(
        scene: Phaser.Scene,
        config?: Tree.IConfig
    );

    readonly isTree: true;
    readonly isNode: false;

    readonly nodesMap: { [nodeKey: string]: Phaser.GameObjects.GameObject };
    readonly nodeBody: Phaser.GameObjects.GameObject;

    addTree(): Tree;

    addTree(
        config: Tree.IAddTreeConfig
    ): Tree;

    addTree(
        nodeKey: string
    ): Tree;

    addTree(
        nodeBody: Phaser.GameObjects.GameObject,
        nodeKey?: string
    ): Tree;

    insertTree(
        index: number,
        config?: Tree.IAddTreeConfig | string
    ): Tree;

    addNode(): Phaser.GameObjects.GameObject;

    addNode(
        config: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    addNode(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    insertNode(
        index: number
    ): Phaser.GameObjects.GameObject;

    insertNode(
        index: number,
        config?: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    insertNode(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig | string
    ): Phaser.GameObjects.GameObject;

    removeNode(
        gameObject: Phaser.GameObjects.GameObject | string,
        destroyChild?: boolean
    ): this;

    removeAllNodes(
        destroyChild?: boolean
    ): this;

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

    getTreesSizer(
        gameObject?: Phaser.GameObjects.GameObject
    ): Trees | null | undefined;

    isGrandsonNode(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    createTree(
        config?: Tree.IConfig | string
    ): Tree;


    setText(text: string): this;
    text: string;

    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;
}