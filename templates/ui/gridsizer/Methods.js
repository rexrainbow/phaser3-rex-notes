import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import LayoutChildren from './LayoutChildren.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveHeight from './ResolveHeight.js';
import ResolveChildrenWidth from './ResolveChildrenWidth.js';
import ResolveChildrenHeight from './ResolveChildrenHeight.js';
import RunWidthWrap from './RunWidthWrap.js';
import RunHeightWrap from './RunHeightWrap.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import SetSpaceMethods from './SetSpaceMethods.js';
import ResetGrid from './ResetGrid.js';
import { InsertEmptyRow, AddEmptyRow } from './InsertEmptyRow.js';
import { InsertEmptyColumn, AddEmptyColumn } from './InsertEmptyColumn.js';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods.js';


var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
    resolveChildrenWidth: ResolveChildrenWidth,
    resolveChildrenHeight: ResolveChildrenHeight,
    runWidthWrap: RunWidthWrap,
    runHeightWrap: RunHeightWrap,

    resetGrid: ResetGrid,
    insertEmptyRow: InsertEmptyRow,
    addEmptyRow: AddEmptyRow,
    insertEmptyColumn: InsertEmptyColumn,
    addEmptyColumn: AddEmptyColumn,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods,
    SetSpaceMethods,
    SortChildrenMethods
);

export default methods;