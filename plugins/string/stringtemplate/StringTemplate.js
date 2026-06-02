import ExpressionParser from '../../math/expressionparser/ExpressionParser.js';
import CompileContent from './CompileContent.js';
import TransformExpression from './TransformExpression.js';


class StringTemplate {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        this.cacheTemplates = false;
        this.templateCache = Object.create(null);
        this.filters = Object.create(null);
        this.expressionTransform = TransformExpression;

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

        if (config.expressionTransform !== undefined) {
            this.setExpressionTransform(config.expressionTransform);
        }

        if (config.filters) {
            this.setFilters(config.filters);
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
        this.registerFilters(expressionParser);
        return this;
    }

    registerFilters(expressionParser) {
        for (var name in this.filters) {
            if (Object.prototype.hasOwnProperty.call(this.filters, name)) {
                expressionParser.setFunction(name, this.filters[name]);
            }
        }
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

    setExpressionTransform(callback) {
        if (callback === undefined) {
            callback = TransformExpression;
        }
        this.expressionTransform = callback;
        return this;
    }

    setFilter(name, callback) {
        this.filters[name] = callback;
        this.expressionParser.setFunction(name, callback);
        return this;
    }

    setFilters(filters) {
        for (var name in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, name)) {
                this.setFilter(name, filters[name]);
            }
        }
        return this;
    }

    removeFilter(name) {
        delete this.filters[name];
        this.expressionParser.removeFunction(name);
        return this;
    }

    clearFilters() {
        for (var name in this.filters) {
            if (Object.prototype.hasOwnProperty.call(this.filters, name)) {
                this.expressionParser.removeFunction(name);
            }
        }
        this.filters = Object.create(null);
        return this;
    }

    getCacheKey(content, delimiterLeft, delimiterRight, expressionCompileConfig, expressionTransform) {
        var expressionCompileConfigKey = expressionCompileConfig ? JSON.stringify(expressionCompileConfig) : '';
        var expressionTransformKey = expressionTransform ? expressionTransform.toString() : '';
        return `${delimiterLeft}\n${delimiterRight}\n${expressionCompileConfigKey}\n${expressionTransformKey}\n${content}`;
    }

    compile(content, config) {
        var delimiterLeft = this.delimiterLeft;
        var delimiterRight = this.delimiterRight;
        var expressionParser = this.expressionParser;
        var expressionCompileConfig;
        var expressionTransform = this.expressionTransform;
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
                if (config.expressionTransform !== undefined) {
                    expressionTransform = config.expressionTransform;
                }
            }
        }

        if (hasCustomExpressionParser) {
            cache = false;
            this.registerFilters(expressionParser);
        }

        if (!delimiterLeft || !delimiterRight) {
            throw new Error('Delimiters must be non-empty strings');
        }

        if (cache) {
            var cacheKey = this.getCacheKey(content, delimiterLeft, delimiterRight, expressionCompileConfig, expressionTransform);
            if (Object.prototype.hasOwnProperty.call(this.templateCache, cacheKey)) {
                return this.templateCache[cacheKey];
            }
        }

        var result = CompileContent(
            content,
            delimiterLeft,
            delimiterRight,
            expressionParser,
            expressionCompileConfig,
            expressionTransform
        );

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
