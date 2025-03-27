import BloomController from '../../shaders/bloom/BloomController';
import CircleController from '../../shaders/circle/CircleController';
import GradientController from '../../shaders/gradient/GradientController';
import ShineController from '../../shaders/shine/ShineController';
import VignetteController from '../../shaders/vignette/VignetteController';
import WipeController from '../../shaders/wipe/WipeController';

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