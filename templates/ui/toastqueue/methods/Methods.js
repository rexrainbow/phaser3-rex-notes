import ConfigurationMethods from './ConfigurationMethods.js';
import MessageMethods from './MessageMethods.js';

var Methods = {};
Object.assign(
    Methods,
    ConfigurationMethods,
    MessageMethods
)

export default Methods;