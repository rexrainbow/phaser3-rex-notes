import ConfigurationMethods from './ConfigurationMethods';
import MessageMethods from './MessageMethods';

var Methods = {};
Object.assign(
    Methods,
    ConfigurationMethods,
    MessageMethods
)

export default Methods;