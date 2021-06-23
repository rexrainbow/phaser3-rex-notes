import FragSrc from './separator-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class SeparatorPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexSeparatorPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.separatorX = 0;
        this.separatorY = 0;
        this.spaceLeft = 0;
        this.spaceRight = 0;
        this.spaceTop = 0;
        this.spaceBottom = 0;
    }

    resetFromJSON(o) {
        var separatedWidth = GetValue(o, 'width', undefined);
        if (separatedWidth === undefined) {
            this.spaceLeft = GetValue(o, 'space.left', 0);
            this.spaceRight = GetValue(o, 'space.right', 0);
        } else {
            this.setSeparatedWidth(separatedWidth);
        }

        var separatedHeight = GetValue(o, 'height', undefined);
        if (separatedHeight === undefined) {
            this.spaceTop = GetValue(o, 'space.top', 0);
            this.spaceBottom = GetValue(o, 'space.bottom', 0);
        } else {
            this.setSeparatedHeight(separatedHeight);
        }

        var separateAtCenter = GetValue(o, 'center', undefined);
        if (separateAtCenter) {
            this.separateAtCenter();
        } else {
            this.separatorX = GetValue(o, 'x', 0);
            this.separatorY = GetValue(o, 'Y', 0);
        }
        return this;
    }

    onPreRender() {
        this.set1f('spaceLeft', this.spaceLeft);
        this.set1f('spaceRight', this.spaceRight);
        this.set1f('spaceTop', this.spaceTop);
        this.set1f('spaceBottom', this.spaceBottom);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('separator', this.separatorX, (textHeight - this.separatorY));
        this.set2f('texSize', texWidth, textHeight);
    }

    // separator
    setSeparator(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        this.separatorX = x;
        this.separatorY = y;
        return this;
    }

    separateAtCenter(width, height) {
        this.setSeparator(this.renderer.width / 2, this.renderer.height / 2)
        if (width !== undefined) {
            this.setSeparatedWidth(width);
        }
        if (height !== undefined) {
            this.setSeparatedHeight(height);
        }
        return this;
    }

    // space
    setSpace(left, right, top, bottom) {
        if (left === undefined) {
            left = 0;
        }
        if (right === undefined) {
            right = 0;
        }
        if (top === undefined) {
            top = 0;
        }
        if (bottom === undefined) {
            bottom = 0;
        }
        this.spaceLeft = left;
        this.spaceRight = right;
        this.spaceTop = top;
        this.spaceBottom = bottom;
        return this;
    }

    get separatedWidth() {
        return this.spaceLeft + this.spaceRight;
    }

    set separatedWidth(value) {
        this.spaceLeft = value / 2;
        this.spaceRight = this.spaceLeft;
    }

    get separatedHeight() {
        return this.spaceTop + this.spaceBottom;
    }

    set separatedHeight(value) {
        this.spaceTop = value / 2;
        this.spaceBottom = this.spaceTop;
    }

    setSeparatedWidth(width) {
        this.separatedWidth = width;
        return this;
    }

    setSeparatedHeight(height) {
        this.separatedHeight = height;
        return this;
    }
}

export default SeparatorPostFxPipeline;