// import * as Phaser from 'phaser';
import GridSizer from '../gridsizer/GridSizer';
import { IConfig as IConfigButtons } from '../utils/buttons/Buttons';


export default GridButtons;

declare namespace GridButtons {

    interface IConfig extends GridSizer.IConfig, IConfigButtons {
        background?: Phaser.GameObjects.GameObject,

        buttons?: Phaser.GameObjects.GameObject[][],
    }
}

declare class GridButtons extends GridSizer {
    constructor(
        scene: Phaser.Scene,
        config?: GridButtons.IConfig
    );

    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setButtonEnable(
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;

    toggleButtonEnable(
        index?: number | Phaser.GameObjects.GameObject
    ): this;

    getButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;

    addButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearButtons(
        destroyChild?: boolean
    ): this;

    showButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachButtton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    value: unknown;
}