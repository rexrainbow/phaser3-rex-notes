import BloomController from '../../shaders/bloom/BloomController';
import CircleController from '../../shaders/circle/CircleController';
import GradientController from '../../shaders/gradient/GradientController';
import ShineController from '../../shaders/shine/ShineController';
import VignetteController from '../../shaders/vignette/VignetteController';
import WipeController from '../../shaders/wipe/WipeController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addBloom: (color?: number, offsetX?: number, offsetY?: number, blurStrength?: number, strength?: number, steps?: number) => BloomController,
            addCircle: (thickness?: number, color?: number, backgroundColor?: number, scale?: number, feather?: number) => CircleController,
            addGradient: (color1?: number, color2?: number, alpha?: number, fromX?: number, fromY?: number, toX?: number, toY?: number, size?: number) => GradientController,
            addShine: (speed?: number, lineWidth?: number, gradient?: number, reveal?: boolean) => ShineController,
            addVignette: (x?: number, y?: number, radius?: number, strength?: number) => VignetteController,
            addWipe: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
            addReveal: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
        }
    }
}