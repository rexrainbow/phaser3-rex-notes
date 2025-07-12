import LazyLoadImageBox from './LazyLoadImageBox';
import ImageBoxBase from '../../plugins/gameobjects/image/imagebox/ImageBoxBase';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number, height?: number,
        key?: string, frame?: string, url?: string,

        scaleUp?: boolean,
        background?: ImageBoxBase.IRectangle | Phaser.GameObjects.GameObject,
        image?: Phaser.GameObjects.GameObject,
        spinner?: LazyLoadImageBox.ISPinnerConfig | Phaser.GameObjects.GameObject,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): LazyLoadImageBox;