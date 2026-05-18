import ExpressionParser from '../../math/expressionparser/ExpressionParser';

class StringTemplate {
    delimiterLeft: any;
    delimiterRight: any;
    expressionParser: any;

    reDelimiter: any;
    reSplit: any;

    constructor(config?: any) {
        if (config === undefined) {
            config = {};
        }
        // Brackets and generate regex
        var delimiters = config.delimiters;
        if (delimiters === undefined) {
            delimiters = ['{{', '}}'];
        }
        this.setDelimiters(delimiters[0], delimiters[1]);

        var expressionParser = config.expressionParser;
        if (expressionParser === undefined) {
            expressionParser = new ExpressionParser();
        }
        this.setExpressionParser(expressionParser);
    }

    setDelimiters(delimiterLeft?: any, delimiterRight?: any) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        this.reDelimiter = RegExp(`${delimiterLeft}|${delimiterRight}`, 'gi');
        this.reSplit = RegExp(`${delimiterLeft}.*?${delimiterRight}`, 'gi')
        return this;
    }

    setExpressionParser(expressionParser?: any) {
        this.expressionParser = expressionParser;
        return this;
    }

    compile(content?: any, config?: any) {
        // Store previous setting
        // Override current setting        
        var delimiterLeftSave, delimiterRightSave;
        var expressionParserSave;
        if (config?: any) {
            if (config instanceof (ExpressionParser)) {
                var expressionParser = config;
                if (expressionParser?: any) {
                    expressionParserSave = this.expressionParser;
                    this.setExpressionParser(expressionParser);
                }

            } else {
                var delimiters = config.delimiters;
                if (delimiters?: any) {
                    delimiterLeftSave = this.delimiterLeft;
                    delimiterRightSave = this.delimiterRight;
                    this.setDelimiters(delimiters[0], delimiters[1]);
                }

                var expressionParser = config.expressionParser;
                if (expressionParser?: any) {
                    expressionParserSave = this.expressionParser;
                    this.setExpressionParser(expressionParser);
                }
            }
        }

        // Parse context
        var reDelimiter = this.reDelimiter
        var reSplit = this.reSplit;
        var expressionParser = this.expressionParser;

        var result = [];
        var charIdx = 0;
        while (true?: any) {
            var regexResult = reSplit.exec(content);
            if (!regexResult) {
                break;
            }

            var match = regexResult[0];
            var matchEnd = reSplit.lastIndex;
            var matchStart = matchEnd - match.length;

            if (charIdx < matchStart) {
                result.push(content.substring(charIdx, matchStart));
            }

            var s = content.substring(matchStart, matchEnd).replace(reDelimiter, '');
            result.push(expressionParser.compile(s))

            charIdx = matchEnd;
        }

        var totalLen = content.length;
        if (charIdx < totalLen) { // Push remainder string
            result.push(content.substring(charIdx, totalLen));
        }

        // Restore previous setting
        if (delimiterLeftSave?: any) {
            this.setDelimiters(delimiterLeftSave, delimiterRightSave);
        }

        if (expressionParserSave?: any) {
            this.setExpressionParser(expressionParserSave);
        }

        // Return render callback
        return function(view?: any) {
            return result.map(function(item?: any) {
                if (typeof (item) === 'function') {
                    item = item(view);
                }
                return item;
            }).join('');
        };
    }

    render(content?: any, view?: any, config?: any) {
        var f;
        if (typeof (content) === 'string') {
            f = this.compile(content, config);
        } else {
            f = content;
        }
        return f(view);
    }
}

export default StringTemplate;