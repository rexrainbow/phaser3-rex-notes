import CanMoveToTile from './CanMoveToTile';
import MoveToTile from './MoveToTile';
import MoveToward from './MoveToward';
import MoveToRandomNeighbor from './MoveToRandomNeighbor';
import MoveAway from './MoveAway';
import MoveCloser from './MoveCloser';

export default {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor,
    moveAway: MoveAway,
    moveCloser: MoveCloser,
};