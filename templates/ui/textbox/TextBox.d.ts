import * as Phaser from 'phaser';
import Label from '../label/Label';

export default class TextBox extends Label {
    constructor(
        scene: Phaser.Scene,

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

                icon?: number,
                text?: number,
            },

            anchor?: {
                left?: string, right?: string, centerX?: string, x?: string,
                top?: string, bottom?: string, centerY?: string, y?: string
            },

            draggable?: boolean | string | Phaser.GameObjects.GameObject,

            name?: string,

            background?: Phaser.GameObjects.GameObject,

            icon?: Phaser.GameObjects.GameObject,
            iconMask?: boolean,

            text?: Phaser.GameObjects.GameObject,
            expandTextWidth?: boolean,
            expandTextHeight?: boolean,

            action?: Phaser.GameObjects.GameObject,
            actionMask?: boolean,

            align?: 'left' | 'top' | 'right' | 'bottom' | 'center',

            page?: {
                maxLines?: number
            },

            type?: {
                speed?: number,
                typeMode?: 0 | 1 | 2 | 3 | 'left-to-right' | 'right-to-left' | 'middle-to-sides' | 'sides-to-middle',
                setTextCallback?: (text: string, isLastChar: boolean, insertIdx: number) => string;
                setTextCallbackScope?: unknown
            }
        }
    );

    start(content: string, typingSpeed?: number): this;
    stop(showAllText?: boolean): this;
    pause(): this;
    resume(): this;
    isTyping: boolean;

    setTypeSpeed(speed: number): this;

    typeNextPage(): this;
    isLastPage: boolean;
    isFirstPage: boolean;
    pageIndex: number;
    pageCount: number;
}