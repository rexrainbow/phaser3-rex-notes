import GlobZone from './GlobZone';
import QuickSet from '../align/align/in/QuickSet';

var AlignIn = function(child?: any, x?: any, y?: any, width?: any, height?: any, align?: any) {
    GlobZone.setPosition(x, y).setSize(width, height);
    QuickSet(child, GlobZone, align);
}

export default AlignIn;