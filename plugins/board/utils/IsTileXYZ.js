var IsTileXYZ = function (tileXYZ) {
    return (!!tileXYZ) &&
        tileXYZ.hasOwnProperty('x') &&
        tileXYZ.hasOwnProperty('y') &&
        tileXYZ.hasOwnProperty('z');
}

export default IsTileXYZ;