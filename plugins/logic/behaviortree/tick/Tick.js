import RemoveItem from '../../../utils/array/Remove.js';
import ExpressionParser from '../../../math/expressionparser/ExpressionParser.js';
import IsExpressionLike from '../utils/IsExpressionLike.js';
import StringTemplate from '../../../string/stringtemplate/StringTemplate.js';


class Tick {

    constructor() {
        // set by BehaviorTree

        this.tree = null;

        this.blackboard = null;

        this.target = null;

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

    get expressionParser() {
        if (!this._expressionParser) {
            this._expressionParser = new ExpressionParser({ cache: true });
        }
        return this._expressionParser;
    }

    set expressionParser(value) {
        this._expressionParser = value;
    }

    get stringTemplate() {
        if (!this._stringTemplate) {
            this._stringTemplate = new StringTemplate({
                expressionParser: this.expressionParser,
                cache: true
            })
        }
        return this._stringTemplate;
    }

    set stringTemplate(value) {
        this._stringTemplate = value;
    }

    getEvalContext() {
        return this.blackboard.getEvalContext();
    }

    evalExpression(expression) {
        if (IsExpressionLike(expression)) {
            return expression._eval(this);;
        }

        return expression;
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
