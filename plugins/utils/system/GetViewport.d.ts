import * as Phaser from 'phaser';

type GetViewPort = (
    scene: Phaser.Scene,
    out?: Phaser.Geom.Rectangle | true
) => Phaser.Geom.Rectangle;

export default GetViewPort;