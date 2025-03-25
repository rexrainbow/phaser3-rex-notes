import BloomStepController from './BloomStepController.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BloomController extends Phaser.Filters.ParallelFilters {
    constructor(camera, config) {
        super(camera);

        this.steps = 0;
        this.offsetX = 1;
        this.offsetY = 1;
        this.blurStrength = 1;
        this.color = 0xffffff;
        this.strength = 1;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setOffset(GetValue(o, 'offsetX', 1), GetValue(o, 'offsetY', 1));
        this.setBlurStrength(GetValue(o, 'blurStrength', 1));
        this.setColor(GetValue(o, 'color', 0xFFFFFF));
        this.setStrength(GetValue(o, 'strength', 1));
        this.setSteps(GetValue(o, 'steps', 4));

        return this;
    }

    forEachController(callback, scope) {
        this.top.list.forEach(callback, scope);
        this.bottom.list.forEach(callback, scope);
    }

    forEachTopController(callback, scope) {
        this.top.list.forEach(callback, scope);
    }

    forEachBottomController(callback, scope) {
        this.bottom.list.forEach(callback, scope);
    }

    get steps() {
        return this._steps;
    }

    set steps(value) {
        if (this._steps === value) {
            return;
        }

        var topFilters = this.top;
        var bottomFilters = this.bottom;
        var camera = this.camera;
        if (this.steps < value) {
            var topFilters = this.top;
            var bottomFilters = this.bottom;
            for (var i = this.steps; i < value; i++) {
                topFilters.add(new BloomStepController(camera));
                bottomFilters.add(new BloomStepController(camera));
            }
        } else { // this.steps > value
            var topFiltersList = this.top.list;
            var bottomFiltersList = this.bottom.list;
            for (var i = this.steps - 1; i >= value; i--) {
                topFiltersList[i].destroy();
                bottomFiltersList[i].destroy();
            }
            topFiltersList.length = value;
            bottomFiltersList.length = value;
        }

        this._steps = value;

        this.setOffset(this.offsetX, this.offsetY);
        this.setBlurStrength(this.strength);
        this.setColor(this.color);
    }

    setSteps(steps) {
        this.steps = steps;
        return this;
    }

    get offsetX() {
        return this._offsetX;
    }

    set offsetX(value) {
        this._offsetX = value;
        this.forEachTopController(function (bloomStepController) {
            bloomStepController.offsetX = value;
        })
        this.forEachBottomController(function (bloomStepController) {
            bloomStepController.offsetX = 0;
        })
    }

    get offsetY() {
        return this._offsetY;
    }

    set offsetY(value) {
        this._offsetY = value;
        this.forEachTopController(function (bloomStepController) {
            bloomStepController.offsetY = 0;
        })
        this.forEachBottomController(function (bloomStepController) {
            bloomStepController.offsetY = value;
        })
    }

    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    get blurStrength() {
        return this._blurStrength;
    }

    set blurStrength(value) {
        this._blurStrength = value;
        this.forEachController(function (bloomStepController) {
            bloomStepController.strength = value;
        });
    }

    setBlurStrength(blurStrength) {
        this.blurStrength = blurStrength;
        return this;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
        this.forEachController(function (bloomStepController) {
            bloomStepController.color = value;
        });
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    get strength() {
        return this._strength;
    }

    set strength(value) {
        this._strength = value;
        this.blend.amount = value;
    }

    setStrength(strength) {
        this.strength = strength;
        return this;
    }

}

export default BloomController;