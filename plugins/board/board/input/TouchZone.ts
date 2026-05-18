import { GameObjects as PhaserGameObjects } from 'phaser';
const Zone = PhaserGameObjects.Zone;

class TouchZone extends Zone {
    setInteractive: any;
    setScrollFactor: any;

    constructor(scene?: any) {
        super(scene, 0, 0, 1, 1);
        scene.add.existing(this);  // Add to scene
        this.setScrollFactor(0);
        this.setInteractive({
            hitArea: {},
            hitAreaCallback: function() { return true; }
        });
    }
}
export default TouchZone;