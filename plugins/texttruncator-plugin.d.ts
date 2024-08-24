import TextTruncator from './texttruncator';

export default class TextTruncatorPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTruncator.IConfig
    ): TextTruncator;

}