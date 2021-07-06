import TextEdit from './TextEdit';
import { IConfigOpen as IConfig } from './TextEdit';

export { IConfig };

export default function Edit(
    textObject: Phaser.GameObjects.GameObject,
    config?: IConfig,
    onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
): TextEdit;