import GetPageKey from './GetPageKeyByIndex';
import GetPageIndex from './GetPageIndexByKey';
import AddPage from './AddPage';
import SwapPageMethods from './SwapPageMethods';
import RemovePageMethods from './RemovePageMethods';
import GetPage from './GetPage';
import GetTab from './GetTab';
import SetTabPosition from './SetTabPosition';
import TabPaddingMethods from './TabPaddingMethods';

var methods = {
    getPageKey: GetPageKey,
    getPageIndex: GetPageIndex,
    addPage: AddPage,
    getPage: GetPage,
    getTab: GetTab,
    setTabPosition: SetTabPosition,
}

Object.assign(
    methods,
    SwapPageMethods,
    RemovePageMethods,
    TabPaddingMethods,
);

export default methods;