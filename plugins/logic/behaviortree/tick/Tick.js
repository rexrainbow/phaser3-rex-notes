import ExpressionParser from '../../../math/expressionparser/ExpressionParser.js';
import StringTemplate from '../../../string/stringtemplate/StringTemplate.js';
import DefaultExpressionTransformHandler from '../nodes/expressions/DefaultExpressionTransformHandler.js';
import BaseExpression from '../nodes/expressions/BaseExpression.js';
import RemoveItem from '../../../utils/array/Remove.js';
import EvaluateExpressionValue from '../nodes/expressions/EvaluateExpressionValue.js';

class Tick {

    constructor() {
        // set by BehaviorTree

        this.tree = null;

        this.blackboard = null;

        this.target = null;

        this.evalContextGetter = undefined;

        this.expressionTransformHandler = DefaultExpressionTransformHandler;

        var parser = new ExpressionParser({
            cache: true
        });
        this.expressionParser = parser;
        this.defaultCompileExpressionHandler = function (expression) {
            return parser.compile(expression);
        }
        this.compileExpressionHandler = this.defaultCompileExpressionHandler;

        var stringTemplateParser = new StringTemplate({
            expressionParser: parser
        })
        this.defaultCompileStringTemplateHandler = function (expression) {
            return stringTemplateParser.compile(expression);
        }
        this.compileStringTemplateHandler = this.defaultCompileStringTemplateHandler;

        // updated during the tick signal

        this._openNodes = [];  // Open nodes of current tick

        this._nodeCount = 0;

        this._currentNode = null;

        this._currentTime = undefined;
    }

    destroy() {
        this.tree = null;
        this.blackboard = null;
        this.target = null;
        this.evalContextGetter = undefined;
        this._openNodes.length = 0;
    }

    // Set members
    setTree(tree) {
        this.tree = tree;
        return this;
    }

    setBlackBoard(blackboard) {
        this.blackboard = blackboard;
        return this;
    }

    setTarget(target) {
        this.target = target;
        return this;
    }

    setEvalContextGetter(callback) {
        this.evalContextGetter = callback;
        return this;
    }

    reset() {
        this._openNodes.length = 0;
        this._nodeCount = 0;
        this._currentTime = undefined;
        return this;
    }

    getGlobalMemory() {
        return this.blackboard.getGlobalMemory();
    }

    getTreeMemory() {
        return this.blackboard.getTreeMemory(this.tree.id);
    }

    getNodeMemory(nodeID) {
        return this.blackboard.getNodeMemory(this.tree.id, nodeID);
    }

    get currentTime() {
        if (this.blackboard.hasValidCurrentTime()) {
            // Inject current-time through blackboard
            return this.blackboard.getCurrentTime();
        } else {
            if (this._currentTime === undefined) {
                this._currentTime = (new Date()).getTime();
            }
            return this._currentTime;
        }
    }

    getEvalContext() {
        if (this.evalContextGetter) {
            return this.evalContextGetter(this);
        }

        return this.blackboard.getGlobalMemory();
    }

    setExpressionTransformHandler(callback) {
        if (callback === undefined) {
            callback = DefaultExpressionTransformHandler;
        }
        this.expressionTransformHandler = callback;
        return this;
    }

    setCompileExpressionHandler(callback) {
        if (callback === undefined) {
            callback = this.defaultCompileExpressionHandler;
        }
        this.compileExpressionHandler = callback;
        return this;
    }

    setCompileStringTemplateHandler(callback) {
        if (callback === undefined) {
            callback = this.defaultCompileStringTemplateHandler;
        }
        this.compileStringTemplateHandler = callback;
        return this;
    }

    evalExpression(expressionObject, context, compile) {
        if (context === undefined) {
            context = this.getEvalContext();
        }
        if (compile === undefined) {
            compile = this.compileExpressionHandler;
        }

        var source;
        if (expressionObject instanceof BaseExpression) {
            source = expressionObject.source;
        } else {
            source = expressionObject;
        }

        return expressionObject.runEvaluationPipeline(
            source,
            this.expressionTransformHandler,
            compile,
            context
        );
    }

    evalStringTemplate(expressionObject, context) {
        return this.evalExpression(expressionObject, context, this.compileStringTemplateHandler);
    }

    _enterNode(node) {
        this._nodeCount++;
        this._openNodes.push(node);
        this._currentNode = node;
    }

    _openNode(node) {
        this._currentNode = node;
    }

    _tickNode(node) {
        this._currentNode = node;
    }

    _closeNode(node) {
        RemoveItem(this._openNodes, node);
        this._currentNode = node;
    }

    _exitNode(node) {
        this._currentNode = node;
    }
};

export default Tick;
