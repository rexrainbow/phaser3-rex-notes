export default PathFollower;

declare namespace PathFollower {

    interface IConfig {
        path?: Phaser.Curves.Path,
        t?: number,
        rotateToPath?: boolean,
        rotationOffset?: number,
        angleOffset?: number
    }
}

declare class PathFollower extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFollower.IConfig
    );

    setT(t: number): this;
    t: number;

    setPath(path: Phaser.Curves.Path): this;
    path: Phaser.Curves.Path;

    setRotateToPath(
        rotateToPath: boolean,
        rotationOffset?: number
    ): this;
    rotateToPath: boolean;
    rotationOffset: number;

}