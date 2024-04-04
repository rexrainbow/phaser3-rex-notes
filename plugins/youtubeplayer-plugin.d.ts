import Factory from './gameobjects/dom/youtubeplayer/Factory';
import Creator from './gameobjects/dom/youtubeplayer/Creator';
export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexYoutubePlayer: typeof Factory,
        }

        interface GameObjectCreator {
            rexYoutubePlayer: typeof Creator,
        }
    }
}