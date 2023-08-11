// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';


export default ScrollablePanel;

declare namespace ScrollablePanel {

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            panel?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            sliderX?: number,
            sliderY?: number,
            header?: number,
            footer?: number,
        },

        panel: {
            child: Phaser.GameObjects.GameObject,
            mask?: (
                {
                    padding?: number | {
                        left?: number, right?: number, top?: number, bottom?: number,
                    },
                    updateMode?: 0 | 1 | 'update' | 'everyTick'
                } |
                boolean
            ),
        },

        align?: {
            header?: Scrollable.AlignTypes,
            footer?: Scrollable.AlignTypes,
            panel?: Scrollable.AlignTypes,
        },

        expand?: {
            header?: boolean,
            footer?: boolean,
            panel?: boolean,
        },
    }
}

declare class ScrollablePanel extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: ScrollablePanel.IConfig
    );

    scrollToChild(
        child: Phaser.GameObjects.GameObject,
        align?: 'top' | 'bottom' | 'centerY' | 'left' | 'right' | 'centerX' | 'center'
    ): this;

}