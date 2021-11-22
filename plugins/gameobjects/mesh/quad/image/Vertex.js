class Vertex {
    constructor(parent, vertexDataIndex, x, y) {
        this.parent = parent;
        this.vertexDataIndex = vertexDataIndex;
        this._x = x;
        this._y = y;
    }

    get vertexData() {
        return this.parent.vertices[this.vertexDataIndex];
    }

    get localX() {
        return this._x;
    }

    set localX(x) {
        if (this._x !== x) {
            this._x = x;

            var gameObject = this.parent;
            var srcHeight = gameObject.height;
            var vHalfWidth = (gameObject.frame.cutWidth / srcHeight) / 2;
            var vx = (x / srcHeight) - vHalfWidth;

            this.vertexData.x = vx;
            this.parent.forceUpdate();
        }
    }

    get localY() {
        return this._y;
    }

    set localY(y) {
        if (this._y !== y) {
            this._y = y;

            var gameObject = this.parent;
            var srcHeight = gameObject.height;
            var vHalfHeight = (gameObject.frame.cutHeight / srcHeight) / 2;
            var vy = (y / srcHeight) - vHalfHeight;

            var flipY = gameObject.frame.source.isRenderTexture;
            this.vertexData.y = (flipY) ? vy : -vy;
            this.parent.forceUpdate();
        }
    }

    get x() {
        var gameObject = this.parent;
        return (this.localX - (gameObject.width / 2)) * gameObject.scaleX + gameObject.x;
    }

    set x(x) {
        var gameObject = this.parent;
        this.localX = ((x - gameObject.x) / gameObject.scaleX) + (gameObject.width / 2)
    }

    get y() {
        var gameObject = this.parent;
        return (this.localY - (gameObject.height / 2)) * gameObject.scaleY + gameObject.y;
    }

    set y(y) {
        var gameObject = this.parent;
        this.localY = ((y - gameObject.y) / gameObject.scaleY) + (gameObject.height / 2)
    }
}

export default Vertex;