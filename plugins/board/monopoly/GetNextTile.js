import TileData from './TileData.js';

const GetRandom = Phaser.Utils.Array.GetRandom;

var GetNextTile = function (curTileData) {
    var board = this.board;
    var directions = board.grid.allDirections;
    var forwardDirection = curTileData.direction,
        forwardTileData = null;
    var backwardDirection = board.getOppositeDirection(curTileData.x, curTileData.y, curTileData.direction),
        backwardTileData = null;
    var neighborTileXArray = []; // forward and other neighbors, exclude backward
    var neighborTileXY, neighborTileData = null;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
        neighborTileXY = board.getNeighborTileXY(curTileData, directions[i]);
        if (neighborTileXY === null) {
            continue;
        }
        if (this.blockerTest) {
            if (board.hasBlocker(neighborTileXY.x, neighborTileXY.y)) {
                continue;
            }
        }
        if (this.edgeBlockerTest) {
            // TODO
        }
        neighborTileData = new TileData(neighborTileXY.x, neighborTileXY.y, directions[i]);
        switch (directions[i]) {
            case forwardDirection:
                forwardTileData = neighborTileData;
                neighborTileXArray.push(neighborTileData);
                break;
            case backwardDirection:
                backwardTileData = neighborTileData;
                break;
        }
    }

    var nextTileData;
    if ((backwardTileData === null) && (neighborTileXArray.length === 0)) {
        // no valid neighbor
        nextTileData = null;
    } else if ((backwardTileData !== null) && (neighborTileXArray.length === 0)) {
        // 1 backward neighbor
        nextTileData = backwardTileData;
    } else if ((backwardTileData === null) && (neighborTileXArray.length === 1)) {
        // 1 neighbor
        nextTileData = neighborTileXArray[0];
    } else {
        // 2 or more neighobrs
        switch (this.pickMode) {
            case 1: // random all
                if (backwardTileData !== null) {
                    neighborTileXArray.push(backwardTileData);
                }
                nextTileData = GetRandom(neighborTileXArray);
                break;

            default: // case 0: forward first
                if (forwardTileData !== null) {
                    nextTileData = forwardTileData;
                } else {
                    nextTileData = GetRandom(neighborTileXArray);
                }
                break;
        }
    }

    return nextTileData;
}

export default GetNextTile;