import ButtonBehavior from '../../../../plugins/input/button/Button';

export interface IConfig {
    click?: ButtonBehavior.IConfig,

    groupName?: string,

    eventEmitter?: Phaser.GameObjects.GameObject,

    type?: 'checkboxes' | 'radio',
    buttonsType?: 'checkboxes' | 'radio',

    setValueCallback?: (button: Phaser.GameObjects.GameObject, value: boolean, previousValue: boolean) => void,

    setValueCallbackScope?: object
}

export interface IButtons {

    getButton(index: number): Phaser.GameObjects.GameObject;
    getButton(name: string): Phaser.GameObjects.GameObject;
    getButton(button: Phaser.GameObjects.GameObject): Phaser.GameObjects.GameObject;

    getButtons(): Phaser.GameObjects.GameObject[];
    hasAnyButton(): boolean;

    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitButtonOver(
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

    buttonsType: string;
    value: unknown;

    setSelectedButtonName(
        name: string
    ): this;

    getSelectedButtonName(): string;

    setButtonState(
        name: string,
        state?: boolean
    ): this;

    clearAllButtonsState(): this;

    getButtonState(
        name: string
    ): boolean;


}