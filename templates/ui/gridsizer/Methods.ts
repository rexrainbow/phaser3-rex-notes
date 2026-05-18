import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetExpandedChildWidth from './GetExpandedChildWidth';
import GetExpandedChildHeight from './GetExpandedChildHeight';
import GetChildrenSizers from './GetChildrenSizers';
import PreLayout from './PreLayout';
import LayoutChildren from './LayoutChildren';
import ResolveWidth from './ResolveWidth';
import ResolveHeight from './ResolveHeight';
import ResolveChildrenWidth from './ResolveChildrenWidth';
import ResolveChildrenHeight from './ResolveChildrenHeight';
import RunWidthWrap from './RunWidthWrap';
import RunHeightWrap from './RunHeightWrap';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';
import SetSpaceMethods from './SetSpaceMethods';
import ResetGrid from './ResetGrid';
import { InsertEmptyRow, AddEmptyRow } from './InsertEmptyRow';
import { InsertEmptyColumn, AddEmptyColumn } from './InsertEmptyColumn';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods';


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