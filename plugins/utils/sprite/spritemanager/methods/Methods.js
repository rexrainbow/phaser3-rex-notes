import RemoveMethods from './RemoveMethods.js';
import PropertyMethods from './PropertyMethods.js';
import AnimationMethods from './AnimationMethods.js';

var Methods = {}
Object.assign(
    Methods,
    RemoveMethods,
    PropertyMethods,
    AnimationMethods
)

export default Methods;