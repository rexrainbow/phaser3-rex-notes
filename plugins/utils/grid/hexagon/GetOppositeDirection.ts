var GetOppositeDirection = function(tileX?: any, tileY?: any, direction?: any) {
    return (direction + 3) % 6;
}
export default GetOppositeDirection;