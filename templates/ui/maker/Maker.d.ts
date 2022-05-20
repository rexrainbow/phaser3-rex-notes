import Make from './Make';

export default Maker;

declare namespace Maker {
    type BuilderType = Make.BuilderType;
    type CustomBuildersType = Make.CustomBuildersType;
}

declare class Maker {
    constructor(
        scene: Phaser.Scene,
        styles?: Object | string,
        customBuilders?: Maker.CustomBuildersType
    );

    setScene(scene: Phaser.Scene): this;
    scene: Phaser.Scene;

    setStyles(styles?: Object | string): this;
    addStyle(key: string, style: Object | string): this;
    clearStyles(): this;
    styles: Object | undefined;

    setCustomBuilders(customBuilders?: Maker.CustomBuildersType): this;
    addCustomBuilder(key: string, customBuilder: Maker.BuilderType): this;
    clearCustomBuilder(): this;
    customBuilders: Maker.CustomBuildersType | undefined;

    make(
        data: Object | string,
        view?: Object | string
    ): Phaser.GameObjects.GameObject;
}