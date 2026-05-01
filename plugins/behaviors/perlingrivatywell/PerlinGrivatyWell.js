import { Utils as PhaserUtils } from 'phaser';
import Perlin from '../../utils/math/noise/Perlin.js';

import { Math as PhaserMath } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const PERIOD_SCALE = 1 / 5000;
const ROTATE_SCALE = 0.3;

class PerlinGrivatyWell {
    constructor(config) {
        this.active = true;
        this.noise = new Perlin(GetValue(config, 'seed', Math.random()));
        this.periodScale = GetValue(config, 'periodScale', PERIOD_SCALE);
        this.rotateScale = GetValue(config, 'rotateScale', ROTATE_SCALE);
        this.velocity = new PhaserMath.Vector2();
    }

    update(particle, delta) {
        var period = delta * this.periodScale;
        var noiseValue = this.noise.perlin2(
            particle.x * period,
            particle.y * period
        ); // -1 ~ 1

        var noiseAngle = noiseValue * Math.PI; // -PI ~ PI
        this.velocity.set(particle.velocityX, particle.velocityY)
            .rotate(noiseAngle * this.rotateScale)

        particle.velocityX = this.velocity.x
        particle.velocityY = this.velocity.y;
    }
}

export default PerlinGrivatyWell;