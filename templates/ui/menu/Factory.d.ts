import * as Phaser from 'phaser';
import Menu from './Menu';

declare type MenuFactory = (
    config?: {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom',

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            item?: number
        },

        anchor?: {
            left?: string, right?: string, centerX?: string, x?: string,
            top?: string, bottom?: string, centerY?: string, y?: string
        },

        draggable?: boolean | string | Phaser.GameObjects.GameObject,

        name?: string,

        items: any[],

        createBackgroundCallback?: (items: any[]) => Phaser.GameObjects.GameObject,

        createBackgroundCallbackScope?: unknown,

        createButtonCallback?: (item: any, index: number, items: any[]) => Phaser.GameObjects.GameObject,

        createButtonCallbackScope?: unknown,

        easeIn?: number |
        {
            duration?: number,
            orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
            ease?: string
        },

        easeOut?: number |
        {
            duration?: number,
            orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
            ease?: string
        },

        expandEvent?: 'button.click' | 'button.over',

        subMenuSide?: 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up',
    }

) => Menu;

export default MenuFactory;