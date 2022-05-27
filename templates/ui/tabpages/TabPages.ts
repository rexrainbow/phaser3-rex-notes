// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';


export default TabPages;

declare namespace TabPages {

    interface IConfig extends Sizer.IConfig {
        swapMode?: 0 | 1 | 'invisible' | 'destroy'
    }

}

declare class TabPages extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: TabPages.IConfig
    );

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

    showPageByIndex(index: string): this;
    showFirstPage(): this;
    showLastPage(): this;
    showPage(key: string): this;
    currentKey: string;
    readonly previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    readonly currentPage: Phaser.GameObjects.GameObject;
    readonly previousPage: Phaser.GameObjects.GameObject;
}