// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default SplitPanels;

declare namespace SplitPanels {

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number, item?: number

            leftPanelTop?: number, leftPanelBottom?: number, leftPanelLeft?: number, leftPanelRight?: number,
            rightPanelTop?: number, rightPanelBottom?: number, rightPanelLeft?: number, rightPanelRight?: number,

            topPanelTop?: number, topPanelBottom?: number, topPanelLeft?: number, topPanelRight?: number,
            bottomPanelTop?: number, bottomPanelBottom?: number, bottomPanelLeft?: number, bottomPanelRight?: number,

            splitterTop?: number, splitterBottom?: number, splitterLeft?: number, splitterRight?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        leftPanel?: Phaser.GameObjects.GameObject,
        topPanel?: Phaser.GameObjects.GameObject,

        rightPanel?: Phaser.GameObjects.GameObject,
        bottomPanel?: Phaser.GameObjects.GameObject,

        splitter?: Phaser.GameObjects.GameObject,

        minLeftPanelWidth?: number,
        minRightPanelWidth?: number,

        minTopPanelHeight?: number,
        minBottomPanelHeight?: number,

        splitRatio?: number,
    }

}

declare class SplitPanels extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: SplitPanels.IConfig
    );

    setSplitterEnable(enable?: boolean): this;
    splitterEnable: boolean;

    setMinLeftPanelWidth(value: number): this;
    minLeftPanelWidth: number;
    setMinRightPanelWidth(value: number): this;
    minRightPanelWidth: number;

    setMinTopPanelHeight(value: number): this;
    minTopPanelHeight: number;
    setMinBottomPanelHeight(value: number): this;
    minBottomPanelHeight: number;

    setSplitRatio(value: number): this;
    splitRatio: number;
}