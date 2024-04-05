import Carousel from './Carousel';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): Carousel;