import { Math as PhaserMath } from 'phaser';
const Vector2 = PhaserMath.Vector2;
class SpeedMonitor {
    position: any;
    velocity: any;

    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
    }

    init(x?: any, y?: any) {
        this.velocity.reset();
        this.position.set(x, y);
        return this;
    }

    update(x?: any, y?: any, delta?: any) {
        // delta in sec
        this.velocity.set(
            x - this.position.x,
            y - this.position.y
        );
        if ((this.velocity.x !== 0) || (this.velocity.y !== 0)) {
            this.velocity.setToPolar(
                this.velocity.angle(),
                this.velocity.length() / delta
            );
        }
        this.position.set(x, y);
        return this;
    }
};

export default SpeedMonitor;