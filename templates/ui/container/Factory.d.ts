import * as Phaser from 'phaser';
import Container from "./Container";

declare type ContainerFactory = (
    x?: number, y?: number,
    width?: number, height?: number,
    children?: Phaser.GameObjects.GameObject[]
) => Container;

export default ContainerFactory;
export { Container };