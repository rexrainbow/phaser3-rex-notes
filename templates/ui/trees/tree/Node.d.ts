import Sizer from '../../sizer/Sizer';
import Tree from './Tree';

export default Node;

declare namespace Node {

}

declare class Node extends Sizer {
    getTreePatent(): Tree;
    getTreeRoot(): Tree;
}