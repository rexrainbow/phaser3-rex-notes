// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';


export default Page;

declare namespace Page {

    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    type PaddingTypes = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    };

    interface IConfig extends OverlapSizer.IConfig {
        swapMode?: 0 | 1 | 'invisible' | 'destroy'
    }

}

declare class Page extends OverlapSizer {
    constructor(
        scene: Phaser.Scene,
        config?: Page.IConfig
    );

    setSwapMode(
        mode: 0 | 1 | 'invisible' | 'destroy'
    ): this;

    addPage(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            key?: string,

            align?: Page.AlignTypes,

            padding?: Page.PaddingTypes,

            expand: boolean |
            {
                width?: boolean,
                height?: boolean,
            },

            minWidth?: number,

            minHeight?: number
        }
    ): this;

    swapPage(key: string): this;
    currentKey: string;
    previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    currentPage: Phaser.GameObjects.GameObject;
    previousPage: Phaser.GameObjects.GameObject;
}