// import * as Phaser from 'phaser';
import Mesh from '../../mesh/Mesh';
import Vertex from '../../mesh/vertex/Vertex';

export default Image;

declare namespace Image {
    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string,

        ninePointMode?: boolean,
        rtl?: boolean,
    }

}

declare class Image extends Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        config?: Image.IConfig
    )

    readonly topLeft: Vertex;
    readonly topCenter: Vertex;
    readonly topRight: Vertex;
    readonly centerLeft: Vertex;
    readonly center: Vertex;
    readonly centerRight: Vertex;
    readonly bottomLeft: Vertex;
    readonly bottomCenter: Vertex;
    readonly bottomRight: Vertex;
}