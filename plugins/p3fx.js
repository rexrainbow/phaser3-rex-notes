import GetGame from './utils/system/GetGame.js';
import RegisterFilter from './utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from './utils/renderer/AddFilterListMethod.js';
import { BloomFilter, BloomController } from './bloomfilter';
import { CircleFilter, CircleController } from './circlefilter';
import { GradientFilter, GradientController } from './gradientfilter';
import { ShineFilter, ShineController } from './shinefilter';
import { VignetteFilter, VignetteController } from './vignettefilter';
import { WipeFilter, WipeController } from './wipefilter';


var InstallP3Fx = function (game) {
    game = GetGame(game);
    RegisterFilter(game, BloomFilter);
    RegisterFilter(game, CircleFilter);
    RegisterFilter(game, GradientFilter);
    RegisterFilter(game, ShineFilter);
    RegisterFilter(game, VignetteFilter);
    RegisterFilter(game, WipeFilter);

    AddFilterListMethod(
        'addP3Bloom',
        function (color, offsetX, offsetY, blurStrength, strength, steps) {
            if (color === undefined) { color = 0xFFFFFF; }
            if (offsetX === undefined) { offsetX = 1; }
            if (offsetY === undefined) { offsetY = 1; }
            if (blurStrength === undefined) { blurStrength = 1; }
            if (strength === undefined) { strength = 1; }
            if (steps === undefined) { steps = 4; }

            return this.add(new BloomController(
                this.camera,
                { color, offsetX, offsetY, blurStrength, strength, steps }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Circle',
        function (thickness, color, backgroundColor, scale, feather) {
            if (thickness === undefined) { thickness = 8; }
            if (color === undefined) { color = 0xFF33B2; }
            if (backgroundColor === undefined) { backgroundColor = 0xFF0000; }
            if (scale === undefined) { scale = 1; }
            if (feather === undefined) { feather = 0.005; }

            return this.add(new CircleController(
                this.camera,
                { thickness, color, backgroundColor, scale, feather }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Gradient',
        function (color1, color2, alpha, fromX, fromY, toX, toY, size) {
            if (color1 === undefined) { color1 = 0xff0000; }
            if (color2 === undefined) { color2 = 0x00ff00; }
            if (alpha === undefined) { alpha = 0.2; }
            if (fromX === undefined) { fromX = 0; }
            if (fromY === undefined) { fromY = 0; }
            if (toX === undefined) { toX = 0; }
            if (toY === undefined) { toY = 1; }
            if (size === undefined) { size = 0; }

            return this.add(new GradientController(
                this.camera,
                { color1, color2, alpha, fromX, fromY, toX, toY, size }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Shine',
        function (speed, lineWidth, gradient, reveal) {
            if (speed === undefined) { speed = 0.5; }
            if (lineWidth === undefined) { lineWidth = 0.5; }
            if (gradient === undefined) { gradient = 3; }
            if (reveal === undefined) { reveal = false; }

            return this.add(new ShineController(
                this.camera,
                { speed, lineWidth, gradient, reveal }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Vignette',
        function (x, y, radius, strength) {
            if (x === undefined) { x = 0.5; }
            if (y === undefined) { y = 0.5; }
            if (radius === undefined) { radius = 0.5; }
            if (strength === undefined) { strength = 0.5; }

            return this.add(new VignetteController(
                this.camera,
                { x, y, radius, strength }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Wipe',
        function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Reveal',
        function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis, reveal: true }
            ));
        }
    );

}

export default InstallP3Fx;

export {
    BloomController, CircleController, GradientController, ShineController, VignetteController, WipeController
}
