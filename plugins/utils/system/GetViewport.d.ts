// import * as Phaser from 'phaser';

export default function GetViewPort(
    scene: Phaser.Scene,
    camera: Phaser.Cameras.Scene2D.BaseCamera,
    out?: Phaser.Geom.Rectangle | true
): Phaser.Geom.Rectangle;

export default function GetViewPort(
    scene: Phaser.Scene,
    out?: Phaser.Geom.Rectangle | true
): Phaser.Geom.Rectangle;