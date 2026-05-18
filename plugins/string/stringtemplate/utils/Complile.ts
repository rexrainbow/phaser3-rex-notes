import StringTemplate from '../StringTemplate';

var stringTemplate = new StringTemplate();
var Compile = function(content?: any, config?: any) {
    return stringTemplate.compile(content, config);
}

export default Compile;