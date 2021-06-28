import * as Phaser from 'phaser';
import Sizer from './Sizer';

declare type SizerFactory = (
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
            item?: number,
        };

        anchor?: {
            left?: string, right?: string, centerX?: string, x?: string,
            top?: string, bottom?: string, centerY?: string, y?: string
        },

        draggable?: boolean | string | Phaser.GameObjects.GameObject,

        name?: string,
    }

) => Sizer;

export default SizerFactory;