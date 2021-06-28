import * as Phaser from 'phaser';
import NumberBar from './NumberBar';

declare type NumberBarFactory = (
    config?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            icon?: number,
            slider?: number,
        };

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

) => NumberBar;

export default NumberBarFactory;