// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import Buttons from '../buttons/Buttons';
import Pages from '../pages/Pages';


export default TabPages;

declare namespace TabPages {

    type tabPositionType = 'top' | 'bottom' | 'left' | 'right';

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        tabPosition?: tabPositionType,
        tabs?: Buttons.IConfig,
        pages?: Pages.IConfig,

        expand?: {
            tabs?: boolean
        },

        
    }

}

declare class TabPages extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: TabPages.IConfig
    );

    getPageKey(index: number): string;
    getPageIndex(key: string): number;

    addPage(
        key: string,
        tabGameObject: Phaser.GameObjects.GameObject,
        pageGameObject: Phaser.GameObjects.GameObject
    ): this;

    addPage(config: {
        key?: string,
        tabGameObject: Phaser.GameObjects.GameObject,
        pageGameObject: Phaser.GameObjects.GameObject
    }): this;

    removePage(
        key: string,
        destroyChild?: boolean
    ): this;

    swapPage(key: string): this;
    swapFirstPage(): this;
    swapLastPage(): this;

    currentKey: string;
    readonly previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    readonly currentPage: Phaser.GameObjects.GameObject;
    readonly previousPage: Phaser.GameObjects.GameObject;
}