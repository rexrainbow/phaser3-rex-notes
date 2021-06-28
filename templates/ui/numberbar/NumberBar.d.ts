import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default class NumberBar extends Sizer {
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
                slider?: number,
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

            slider?: {
                background?: Phaser.GameObjects.GameObject,
                track?: Phaser.GameObjects.GameObject,
                indicator?: Phaser.GameObjects.GameObject,
                thumb?: Phaser.GameObjects.GameObject,
                input?: 'drag' | 'click' | 'none',
                gap?: number,
                easeValue?: {
                    duration?: number,
                    ease?: string
                },
            }

            text?: Phaser.GameObjects.GameObject,

            valuechangeCallback?: (newValue: number, oldValue: number, numberBar: NumberBar) => void,
        }
    );

    value:number;

    getValue(min?:number, max?:number):number;

    setValue(value?:number, min?:number, max?:number):this;

    addValue(inc?:number, min?:number, max?:number):this;

    easeValueTo(value?:number, min?:number, max?:number):this;

    text:string;

    setText(text:string):this;

}