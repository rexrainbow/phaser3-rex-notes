import FullWindow from '../../../behaviors/fullwindow/FullWindow';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Zone = PhaserGameObjects.Zone;

class FullWindowRectangle extends Zone {
    fullWindow: any;

    constructor(scene?: any) {
        super(scene, 0, 0, 2, 2);

        this.fullWindow = new FullWindow(this);
    }
}

export default FullWindowRectangle;