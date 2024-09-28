import Sizer from '../../../sizer/Sizer';
import Tree from '../Tree';
import Trees from '../../Trees';

export default Node;

declare namespace Node {

}

declare class Node extends Sizer {
    readonly isTree: false;
    readonly isNode: true;

    readonly nodeBody: Phaser.GameObjects.GameObject;

    getTreePatent(): Tree;
    getTreeRoot(): Tree;
    getTreesSizer(): Trees | null | undefined;

    setText(text: string): this;
    text: string;

    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;
}