import ALIGN_CONST from '../const';
import BottomCenter from './BottomCenter';
import BottomLeft from './BottomLeft';
import BottomRight from './BottomRight';
import Center from './Center';
import LeftCenter from './LeftCenter';
import RightCenter from './RightCenter';
import TopCenter from './TopCenter';
import TopLeft from './TopLeft';
import TopRight from './TopRight';

var AlignInMap = [];

AlignInMap[ALIGN_CONST.BOTTOM_CENTER] = BottomCenter;
AlignInMap[ALIGN_CONST.BOTTOM_LEFT] = BottomLeft;
AlignInMap[ALIGN_CONST.BOTTOM_RIGHT] = BottomRight;
AlignInMap[ALIGN_CONST.CENTER] = Center;
AlignInMap[ALIGN_CONST.LEFT_CENTER] = LeftCenter;
AlignInMap[ALIGN_CONST.RIGHT_CENTER] = RightCenter;
AlignInMap[ALIGN_CONST.TOP_CENTER] = TopCenter;
AlignInMap[ALIGN_CONST.TOP_LEFT] = TopLeft;
AlignInMap[ALIGN_CONST.TOP_RIGHT] = TopRight;

var QuickSet = function(child?: any, alignIn?: any, position?: any, offsetX?: any, offsetY?: any) {
    return AlignInMap[position](child, alignIn, offsetX, offsetY);
};

export default QuickSet;