import parser from './parser';

const Parser = new parser.Parser();
var Parse = function(input?: any) {
    return Parser.parse(input);
}

export default Parse;