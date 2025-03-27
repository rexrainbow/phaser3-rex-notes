import { BloomController } from './bloomfilter';
import { CircleController } from './circlefilter';
import { GradientController } from './gradientfilter';
import { ShineController } from './shinefilter';
import { VignetteController } from './vignettefilter';
import { WipeController } from './wipefilter';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Bloom: (color?: number, offsetX?: number, offsetY?: number, blurStrength?: number, strength?: number, steps?: number) => BloomController,
            addP3Circle: (thickness?: number, color?: number, backgroundColor?: number, scale?: number, feather?: number) => CircleController,
            addP3Gradient: (color1?: number, color2?: number, alpha?: number, fromX?: number, fromY?: number, toX?: number, toY?: number, size?: number) => GradientController,
            addP3Shine: (speed?: number, lineWidth?: number, gradient?: number, reveal?: boolean) => ShineController,
            addP3Vignette: (x?: number, y?: number, radius?: number, strength?: number) => VignetteController,
            addP3Wipe: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
            addP3Reveal: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
        }
    }
}

declare function InstallP3Fx(scene: Phaser.Scene | Phaser.Game): void;

export default InstallP3Fx;

export {
    BloomController, CircleController, GradientController, ShineController, VignetteController, WipeController
}