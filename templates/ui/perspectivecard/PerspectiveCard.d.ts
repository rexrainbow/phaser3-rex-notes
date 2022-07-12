// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import {
    PerspectiveCard as Card
} from '../../../plugins/perspectiveimage';


export default PerspectiveCard;

declare namespace PerspectiveCard {

    interface IConfig extends OverlapSizer.IConfig, Card.IConfig {
    }

}

declare class PerspectiveCard extends OverlapSizer {
    constructor(
        scene: Phaser.Scene,
        config?: PerspectiveCard.IConfig
    );

    flip: Card.Flip;

    setFace(face: Card.FaceTypes): this;
    toggleFace(): this;
    face: number;

}