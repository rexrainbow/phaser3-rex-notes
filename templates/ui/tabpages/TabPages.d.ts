// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';


export default TabPages;

declare namespace TabPages {
    type TabsPositionType = 'top' | 'bottom' | 'left' | 'right';

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        tabPosition?: TabsPositionType,
        tabsPosition?: TabsPositionType,

        wrapTabs?: boolean,
        tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
        pages?: Pages.IConfig,

        expand?: {
            tabs?: boolean
        },

        align?: {
            tabs?: 'top' | 'bottom' | 'left' | 'right' | 'center'
        }


    }

    interface IAddPageConfig {
        key?: string,
        tab: Phaser.GameObjects.GameObject,
        page: Phaser.GameObjects.GameObject
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

    addPage(config: TabPages.IAddPageConfig): this;

    removePage(
        key: string,
        destroyChild?: boolean
    ): this;
    removeAllPages(destroyChild?: boolean): this;

    swapPage(
        key: string,
        fadeInDuration?: number
    ): this;
    swapFirstPage(fadeInDuration?: number): this;
    swapLastPage(fadeInDuration?: number): this;

    currentKey: string;
    readonly previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    readonly currentPage: Phaser.GameObjects.GameObject;
    readonly previousPage: Phaser.GameObjects.GameObject;

    setTabPosition(position: TabPages.TabsPositionType): this;
    readonly tabsPosition: TabPages.TabsPositionType;

    setTabsPadding(
        key: string,
        value?: number
    ): this;

    setTabsPadding(
        padding: number | { left?: number, right?: number, top?: number, bottom?: number },
    ): this;

    getTabsPadding(
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

}