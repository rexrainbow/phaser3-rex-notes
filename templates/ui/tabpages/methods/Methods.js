import AddPage from './AddPage.js';
import SwapPageMethods from './SwapPageMethods.js';
import GetPage from './GetPage.js';
import RemovePageMethods from './RemovePageMethods.js';

var methods = {
    addPage: AddPage,
    getPage: GetPage,
}

Object.assign(
    methods,
    SwapPageMethods,
    RemovePageMethods

);

export default methods;