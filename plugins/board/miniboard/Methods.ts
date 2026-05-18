import AddChess from './chess/AddChess';
import RemoveChess from './chess/RemoveChess';
import RemoveAllChess from './chess/RemoveAllChess';
import GetAllChess from './chess/GetAllChess';
import WorldXYToChess from './chess/WorldXYToChess';

import SetMainBoard from './mainboard/SetMainboard';
import CanPutOnMainBoard from './mainboard/CanPutOnMainBoard';
import PutOnMainBoard from './mainboard/PutOnMainBoard';
import PullOutFromMainBoard from './mainboard/PullOutFromMainBoard';
import PutBack from './mainboard/PutBack';
import IsOverlapping from './mainboard/IsOverlapping';
import AlignToMainBoard from './mainboard/AlignToMainBoard';

import SetInteractive from './input/SetInteractive';
import SetDraggable from './input/SetDraggable';
import DragEnd from './input/DragEnd';
import IsInTouching from './input/IsInTouching';

import CanMirror from './transform/CanMirror';
import Mirror from './transform/Mirror';
import CanRotate from './transform/CanRotate';
import Rotate from './transform/Rotate';
import CanRotateTo from './transform/CanRotateTo';
import RotateTo from './transform/RotateTo';
import GetBounds from './transform/GetBounds';
import SetOrigin from './transform/SetOrigin';

export default {
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    getAllChess: GetAllChess,
    worldXYToChess: WorldXYToChess,

    pullOutFromMainBoard: PullOutFromMainBoard,
    canPutOnMainBoard: CanPutOnMainBoard,
    putOnMainBoard: PutOnMainBoard,
    putBack: PutBack,
    isOverlapping: IsOverlapping,
    alignToMainBoard: AlignToMainBoard,

    setInteractive: SetInteractive,
    setDraggable: SetDraggable,
    dragEnd: DragEnd,
    isInTouching: IsInTouching,

    setMainBoard: SetMainBoard,
    canMirror: CanMirror,
    mirror: Mirror,
    canRotate: CanRotate,
    rotate: Rotate,
    canRotateTo: CanRotateTo,
    rotateTo: RotateTo,
    getBounds: GetBounds,
    setOrigin: SetOrigin
};