import TreeManagerMethods from './TreeManagerMethods.js';
import GameObjectMethods from './GameObjectMethods.js';
import WaitMethods from './WaitMethods.js';
import DefaultHandler from './DefaultHandler.js';

var Methods = {
    defaultHandler: DefaultHandler,
}

Object.assign(
    Methods,
    TreeManagerMethods,
    GameObjectMethods,
    WaitMethods,
)


export default Methods;