import { TextEdit, Edit } from './textedit';

export default class TextPagePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextEdit.IConfig
    ): TextEdit;

    edit: typeof Edit;
}