var IsTileXYZ = function (tileXY) {
    return (!!tileXY) &&
        tileXY.hasOwnProperty('x') &&
        tileXY.hasOwnProperty('y');
}

export default IsTileXYZ;