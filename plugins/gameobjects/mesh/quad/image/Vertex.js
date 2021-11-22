import { LocalXYToWorldXY, WorldXYToLocalXY } from '../../utils/LocalXY.js';


class Vertex {
    constructor(parent, vertexData, x, y) {
        this.parent = parent;
        this.vertexData = vertexData;
        this._localX = x;
        this._localY = y;
    }

    updateVertexPosition(x, y) {
        var gameObject = this.parent;
        var srcHeight = gameObject.height;
        var vHalfWidth = (gameObject.frame.cutWidth / srcHeight) / 2;
        var vHalfHeight = (gameObject.frame.cutHeight / srcHeight) / 2;

        var vx = (x / srcHeight) - vHalfWidth;
        var vy = (y / srcHeight) - vHalfHeight;

        var flipY = gameObject.frame.source.isRenderTexture;
        var vertex = this.vertexData;
        vertex.x = vx;
        vertex.y = (flipY) ? vy : -vy;
        gameObject.forceUpdate();
        return this;
    }

    get localX() {
        return this._localX;
    }

    set localX(x) {
        this.setLocalXY(x, this._localY);
    }

    get localY() {
        return this._localY;
    }

    set localY(y) {
        this.setLocalXY(this._localX, y);
    }

    setLocalXY(x, y) {
        if ((this._localX === x) && (this._localY === y)) {
            return this;
        }

        this._localX = x;
        this._localY = y;
        this.updateVertexPosition(x, y);

        return this;
    }

    setWorldXY(x, y) {
        if ((this._worldX === x) && (this._worldY === y)) {
            return this;
        }

        var localXY = WorldXYToLocalXY(this.parent, x, y);
        this.setLocalXY(localXY.x, localXY.y);

        return this;
    }

    setPosition(x, y) {
        this.setWorldXY(x, y);
        return this;
    }

    getWorldXY() {
        return LocalXYToWorldXY(this.parent, this._localX, this._localY);
    }

    get x() {
        var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
        return worldXY.x;
    }

    set x(x) {
        this.setWorldXY(x, this.y);
    }

    get y() {
        var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
        return worldXY.y;
    }

    set y(y) {
        this.setWorldXY(this.x, y);
    }
}

export default Vertex;