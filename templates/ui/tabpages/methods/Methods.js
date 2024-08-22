import GetPageKey from './GetPageKeyByIndex.js';
import GetPageIndex from './GetPageIndexByKey.js';
import AddPage from './AddPage.js';
import SwapPageMethods from './SwapPageMethods.js';
import RemovePageMethods from './RemovePageMethods.js';
import GetPage from './GetPage.js';
import GetTab from './GetTab.js';
import SetTabPosition from './SetTabPosition.js';
import TabPaddingMethods from './TabPaddingMethods.js';

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