var GetWorldX = function(tileX?: any, tileY?: any) {
    return this.getWorldXY(tileX, tileY, true).x;
}

export default GetWorldX;