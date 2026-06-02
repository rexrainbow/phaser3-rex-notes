import ExpressionParser from '../../math/expressionparser/ExpressionParser.js';
import CompileContent from './CompileContent.js';


class StringTemplate {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        this.cacheTemplates = false;
        this.templateCache = Object.create(null);

        // Brackets and generate regex
        var delimiters = config.delimiters;
        if (delimiters === undefined) {
            delimiters = ['{{', '}}'];
        }
        this.setDelimiters(delimiters[0], delimiters[1]);

        var expressionParser = config.expressionParser;
        if (expressionParser === undefined) {
            expressionParser = new ExpressionParser(config);
        }
        this.setExpressionParser(expressionParser);

        if (config.cache !== undefined) {
            this.setCacheEnable(config.cache);
        }
    }

    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        if (!delimiterLeft || !delimiterRight) {
            throw new Error('Delimiters must be non-empty strings');
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        return this;
    }

    setExpressionParser(expressionParser) {
        this.expressionParser = expressionParser;
        return this;
    }

    setCacheEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.cacheTemplates = enable;
        return this;
    }

    clearCache() {
        this.templateCache = Object.create(null);
        return this;
    }

    getCacheKey(content, delimiterLeft, delimiterRight, expressionCompileConfig) {
        var expressionCompileConfigKey = expressionCompileConfig ? JSON.stringify(expressionCompileConfig) : '';
        return `${delimiterLeft}\n${delimiterRight}\n${expressionCompileConfigKey}\n${content}`;
    }

    compile(content, config) {
        var delimiterLeft = this.delimiterLeft;
        var delimiterRight = this.delimiterRight;
        var expressionParser = this.expressionParser;
        var expressionCompileConfig;
        var cache = this.cacheTemplates;
        var hasCustomExpressionParser = false;

        if (config) {
            if (config instanceof (ExpressionParser)) {
                expressionParser = config;
                hasCustomExpressionParser = true;
            } else {
                var delimiters = config.delimiters;
                if (delimiters) {
                    delimiterLeft = delimiters[0];
                    delimiterRight = delimiters[1];
                }

                if (config.expressionParser) {
                    expressionParser = config.expressionParser;
                    hasCustomExpressionParser = true;
                }

                if (config.cache !== undefined) {
                    cache = config.cache;
                }

                expressionCompileConfig = config.expressionCompileConfig;
            }
        }

        if (hasCustomExpressionParser) {
            cache = false;
        }

        if (!delimiterLeft || !delimiterRight) {
            throw new Error('Delimiters must be non-empty strings');
        }

        if (cache) {
            var cacheKey = this.getCacheKey(content, delimiterLeft, delimiterRight, expressionCompileConfig);
            if (Object.prototype.hasOwnProperty.call(this.templateCache, cacheKey)) {
                return this.templateCache[cacheKey];
            }
        }

        var result = CompileContent(content, delimiterLeft, delimiterRight, expressionParser, expressionCompileConfig);

        // Return render callback
        var renderCallback = function (view) {
            return result.map(function (item) {
                if (typeof (item) === 'function') {
                    item = item(view);
                }
                return item;
            }).join('');
        };

        if (cache) {
            this.templateCache[cacheKey] = renderCallback;
        }

        return renderCallback;
    }

    render(content, view, config) {
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
