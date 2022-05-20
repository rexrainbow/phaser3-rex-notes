import Builders from './builders/Builders';
export default Make;

declare namespace Make {
    type BuilderType = Builders.BuilderType;
    type CustomBuildersType = { [name: string]: BuilderType }
}

declare function Make(
    scene: Phaser.Scene,
    config: Object,
    styles?: Object,
    customBuilders?: Make.CustomBuildersType
): Phaser.GameObjects.GameObject;