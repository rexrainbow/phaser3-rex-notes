const Zone = Phaser.GameObjects.Zone;

class Space extends Zone {
    constructor(scene, x, y) {
        super(scene, x, y, 1, 1);
        this.isRexSpace = true;
    }
}
export default Space;