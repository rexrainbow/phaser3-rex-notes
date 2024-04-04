import OpenFileChooser from './behaviors/filechooser/Open';
import Factory from './gameobjects/dom/filechooser/Factory';
import Creator from './gameobjects/dom/filechooser/Creator';

export default class extends Phaser.Plugins.BasePlugin {
    open(config?: OpenFileChooser.IConfig): Promise<OpenFileChooser.IResult>
}

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexFileChooser: typeof Factory,
        }

        interface GameObjectCreator {
            rexFileChooser: typeof Creator,
        }
    }
}