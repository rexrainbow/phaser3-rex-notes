import CursorAtBounds from './cursoratbounds';

export default class CursorAtBoundsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: CursorAtBounds.IConfig
    ): CursorAtBounds;

}