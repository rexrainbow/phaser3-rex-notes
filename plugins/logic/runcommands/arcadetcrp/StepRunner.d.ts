export default StepRunner;

declare namespace StepRunner {

}

declare class StepRunner {
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
    );

    add(
        command: any[],
        scope?: object
    ): this
}