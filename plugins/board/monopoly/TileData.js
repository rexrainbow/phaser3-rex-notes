class TileData {
    constructor(x, y, direction) {
        this.setTo(x, y, direction);
    }

    setTo(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        return this;
    }
}

export default TileData;