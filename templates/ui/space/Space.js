import { GameObjects as PhaserGameObjects } from 'phaser';
const Zone = PhaserGameObjects.Zone;

class Space extends Zone {
    constructor(scene) {
        super(scene, 0, 0, 1, 1);
        // Don't add Zone into scene
        this.isRexSpace = true;
    }
}
export default Space;