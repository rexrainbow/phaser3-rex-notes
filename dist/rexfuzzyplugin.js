(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfuzzyplugin = factory());
})(this, (function () { 'use strict';

    var GetVariableName = function (setName) {
        if (setName.indexOf('.') !== -1) {
            return setName.split('.')[0];
        } else {
            return setName.replace(/[+-]*/g, '')
        }
    };

    // https://github.com/Mugen87/yuka
    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    */
    class FuzzyModule {
    	constructor() {
    		this.rules = [];
    		this.flvs = {};

    	}

    	addFLV(name, flv) {
    		this.flvs[name] = flv;
    		return this;

    	}

    	removeFLV(name) {
    		delete this.flvs[name];
    		return this;

    	}

    	hasFLV(name) {
    		return this.flvs.hasOwnProperty(name);
    	}

    	addRule(rule) {
    		this.rules.push(rule);
    		return this;

    	}

    	removeRule(rule) {
    		const rules = this.rules;
    		const index = rules.indexOf(rule);
    		rules.splice(index, 1);
    		return this;

    	}

    	fuzzify(name, value) {
    		if (typeof (name) === 'string') {
    			this._fuzzify(name, value);

    		} else {
    			let names = name;
    			for (name in names) {
    				this._fuzzify(name, names[name]);
    			}
    		}

    		this.dirty = true;
    		return this;
    	}

    	_fuzzify(name, value) {
    		if (!this.hasFLV(name)) {
    			return;
    		}

    		this.flvs[name].fuzzify(value);
    	}

    	defuzzify(name, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {

    		this._evaluate();

    		let result;
    		if (typeof (name) === 'string') {
    			result = this._defuzzify(name, type);

    		} else if (Array.isArray(name)) {
    			result = {};
    			let names = name;
    			for (let i = 0, cnt = names.length; i < cnt; i++) {
    				name = names[i];
    				result[name] = this._defuzzify(name, type);
    			}
    		} else {
    			// Get all variable names of consequence        
    			let names = [];
    			let rules = this.rules;
    			for (let i = 0, cnt = rules.length; i < cnt; i++) {
    				let consequence = rules[i].consequence;
    				let name = GetVariableName(consequence.name);

    				if (names.indexOf(name) === -1) {
    					names.push(name);
    				}
    			}
    			result = this.defuzzify(names, type);

    		}

    		return result;
    	}

    	_defuzzify(name, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {
    		if (!this.hasFLV(name)) {
    			return;
    		}

    		const flv = this.flvs[name];

    		let value;
    		switch (type) {
    			case FuzzyModule.DEFUZ_TYPE.MAXAV:
    				value = flv.defuzzifyMaxAv();
    				break;

    			case FuzzyModule.DEFUZ_TYPE.CENTROID:
    				value = flv.defuzzifyCentroid();
    				break;

    			default:	
    				value = flv.defuzzifyMaxAv(); // use MaxAv as fallback
    		}

    		return value;
    	}

    	_evaluate() {
    		if (!this.dirty) {
    			return;
    		}

    		const rules = this.rules;
    		this._initConsequences();
    		for (let i = 0, l = rules.length; i < l; i++) {
    			rules[i].evaluate();
    		}

    		this.dirty = false;
    	}

    	_initConsequences() {
    		const rules = this.rules;
    		// initializes the consequences of all rules.
    		for (let i = 0, l = rules.length; i < l; i++) {
    			const rule = rules[i];
    			rule.initConsequence();
    		}
    		return this;

    	}
    }

    FuzzyModule.DEFUZ_TYPE = Object.freeze({
    	MAXAV: 0,
    	CENTROID: 1
    });

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    */
    class FuzzyVariable {
    	constructor() {

    		this.fuzzySets = [];

    		this.minRange = Infinity;
    		this.maxRange = - Infinity;

    	}

    	add(fuzzySet) {
    		this.fuzzySets.push(fuzzySet);

    		// adjust range
    		if (fuzzySet.left < this.minRange) {
    			this.minRange = fuzzySet.left;
    		}		if (fuzzySet.right > this.maxRange) {
    			this.maxRange = fuzzySet.right;
    		}

    		return this;
    	}

    	remove(fuzzySet) {

    		const fuzzySets = this.fuzzySets;

    		const index = fuzzySets.indexOf(fuzzySet);
    		fuzzySets.splice(index, 1);

    		// iterate over all fuzzy sets to recalculate the min/max range
    		this.minRange = Infinity;
    		this.maxRange = - Infinity;

    		for (let i = 0, l = fuzzySets.length; i < l; i++) {

    			const fuzzySet = fuzzySets[i];

    			if (fuzzySet.left < this.minRange) {
    				this.minRange = fuzzySet.left;
    			}
    			if (fuzzySet.right > this.maxRange) {
    				this.maxRange = fuzzySet.right;
    			}

    		}

    		return this;
    	}

    	fuzzify(value) {

    		if (value < this.minRange || value > this.maxRange) {
    			// Logger.warn('YUKA.FuzzyVariable: Value for fuzzification out of range.');
    			return;
    		}

    		const fuzzySets = this.fuzzySets;
    		for (let i = 0, l = fuzzySets.length; i < l; i++) {
    			const fuzzySet = fuzzySets[i];
    			fuzzySet.degreeOfMembership = fuzzySet.computeDegreeOfMembership(value);

    		}

    		return this;
    	}


    	defuzzifyMaxAv() {

    		// the average of maxima (MaxAv for short) defuzzification method scales the
    		// representative value of each fuzzy set by its DOM and takes the average
    		const fuzzySets = this.fuzzySets;

    		let bottom = 0;
    		let top = 0;

    		for (let i = 0, l = fuzzySets.length; i < l; i++) {
    			const fuzzySet = fuzzySets[i];
    			bottom += fuzzySet.degreeOfMembership;
    			top += fuzzySet.representativeValue * fuzzySet.degreeOfMembership;
    		}

    		return (bottom === 0) ? 0 : (top / bottom);
    	}

    	defuzzifyCentroid(samples = 10) {

    		const fuzzySets = this.fuzzySets;
    		const stepSize = (this.maxRange - this.minRange) / samples;

    		let totalArea = 0;
    		let sumOfMoments = 0;

    		for (let s = 1; s <= samples; s++) {
    			const sample = this.minRange + (s * stepSize);

    			for (let i = 0, l = fuzzySets.length; i < l; i++) {
    				const fuzzySet = fuzzySets[i];
    				const contribution = Math.min(fuzzySet.degreeOfMembership, fuzzySet.computeDegreeOfMembership(sample));
    				totalArea += contribution;
    				sumOfMoments += (sample * contribution);
    			}

    		}

    		return (totalArea === 0) ? 0 : (sumOfMoments / totalArea);
    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyTerm
    */

    class FuzzySet {

    	constructor(representativeValue = 0) {
    		this.degreeOfMembership = 0;
    		this.representativeValue = representativeValue;

    		this.left = 0;
    		this.right = 0;

    	}

    	computeDegreeOfMembership() { }

    	clearDegreeOfMembership() {

    		this.degreeOfMembership = 0;

    		return this;

    	}

    	getDegreeOfMembership() {
    		return this.degreeOfMembership;

    	}

    	updateDegreeOfMembership(value) {
    		if (value > this.degreeOfMembership) {
    			this.degreeOfMembership = value;
    		}

    		return this;

    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzySet
    */
    class LeftShoulderFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {
    		// the representative value is the midpoint of the plateau of the shoulder
    		const representativeValue = (midpoint + left) / 2;
    		super(representativeValue);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {
    		const midpoint = this.midpoint;
    		const left = this.left;
    		const right = this.right;

    		// find DOM if the given value is left of the center or equal to the center
    		if ((value >= left) && (value <= midpoint)) {
    			return 1;

    		}

    		// find DOM if the given value is right of the midpoint
    		if ((value > midpoint) && (value <= right)) {
    			const grad = 1 / (right - midpoint);
    			return grad * (right - value);

    		}

    		// out of range
    		return 0;

    	}
    }

    /**
    * @author {@link https://github.com/robp94|robp94}
    * @augments FuzzySet
    */
    class LeftSCurveFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {
    		// the representative value is the midpoint of the plateau of the shoulder
    		const representativeValue = (midpoint + left) / 2;
    		super(representativeValue);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {

    		const midpoint = this.midpoint;
    		const left = this.left;
    		const right = this.right;

    		// find DOM if the given value is left of the center or equal to the center

    		if ((value >= left) && (value <= midpoint)) {

    			return 1;

    		}

    		// find DOM if the given value is right of the midpoint

    		if ((value > midpoint) && (value <= right)) {
    			if (value >= ((midpoint + right) / 2)) {
    				return 2 * (Math.pow((value - right) / (midpoint - right), 2));

    			} else { //todo test
    				return 1 - (2 * (Math.pow((value - midpoint) / (midpoint - right), 2)));

    			}

    		}

    		// out of range
    		return 0;

    	}
    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzySet
    */
    class RightShoulderFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {
    		// the representative value is the midpoint of the plateau of the shoulder
    		const representativeValue = (midpoint + right) / 2;
    		super(representativeValue);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {
    		const midpoint = this.midpoint;
    		const left = this.left;
    		const right = this.right;

    		// find DOM if the given value is left of the center or equal to the center
    		if ((value >= left) && (value <= midpoint)) {
    			const grad = 1 / (midpoint - left);
    			return grad * (value - left);

    		}

    		// find DOM if the given value is right of the midpoint
    		if ((value > midpoint) && (value <= right)) {
    			return 1;

    		}

    		// out of range
    		return 0;

    	}
    }

    /**
    * @author {@link https://github.com/robp94|robp94}
    * @augments FuzzySet
    */
    class RightSCurveFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {

    		// the representative value is the midpoint of the plateau of the shoulder
    		const representativeValue = (midpoint + right) / 2;
    		super(representativeValue);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {

    		const midpoint = this.midpoint;
    		const left = this.left;
    		const right = this.right;

    		// find DOM if the given value is left of the center or equal to the center

    		if ((value >= left) && (value <= midpoint)) {
    			if (value <= ((left + midpoint) / 2)) {
    				return 2 * (Math.pow((value - left) / (midpoint - left), 2));

    			} else {
    				return 1 - (2 * (Math.pow((value - midpoint) / (midpoint - left), 2)));

    			}
    		}

    		// find DOM if the given value is right of the midpoint
    		if ((value > midpoint) && (value <= right)) {
    			return 1;

    		}

    		// out of range
    		return 0;

    	}
    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzySet
    */
    class TriangularFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {

    		super(midpoint);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {

    		const midpoint = this.midpoint;
    		const left = this.left;
    		const right = this.right;

    		// find DOM if the given value is left of the center or equal to the center

    		if ((value >= left) && (value <= midpoint)) {
    			const grad = 1 / (midpoint - left);
    			return grad * (value - left);

    		}

    		// find DOM if the given value is right of the center
    		if ((value > midpoint) && (value <= right)) {
    			const grad = 1 / (right - midpoint);
    			return grad * (right - value);

    		}

    		// out of range
    		return 0;

    	}
    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzySet
    */
    class SingletonFuzzySet extends FuzzySet {
    	constructor(left, midpoint, right) {

    		super(midpoint);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;

    	}

    	computeDegreeOfMembership(value) {
    		const left = this.left;
    		const right = this.right;
    		return (value >= left && value <= right) ? 1 : 0;

    	}
    }

    /**
    * @author {@link https://github.com/robp94|robp94}
    * @augments FuzzySet
    */
    class NormalDistFuzzySet extends FuzzySet {

    	constructor(left, midpoint, right, standardDeviation) {
    		super(midpoint);

    		this.left = left;
    		this.midpoint = midpoint;
    		this.right = right;
    		this.standardDeviation = standardDeviation;
    		this._cache = {};

    	}

    	computeDegreeOfMembership(value) {

    		this._updateCache();

    		if (value >= this.right || value <= this.left) {
    			return 0;
    		}

    		return ProbabilityDensity(value, this.midpoint, this._cache.variance) / this._cache.normalizationFactor;

    	}

    	_updateCache() {

    		const cache = this._cache;
    		const midpoint = this.midpoint;
    		const standardDeviation = this.standardDeviation;

    		if (midpoint !== cache.midpoint || standardDeviation !== cache.standardDeviation) {

    			const variance = standardDeviation * standardDeviation;

    			cache.midpoint = midpoint;
    			cache.standardDeviation = standardDeviation;
    			cache.variance = variance;

    			// this value is used to ensure the DOM lies in the range of [0,1]

    			cache.normalizationFactor = ProbabilityDensity(midpoint, midpoint, variance);

    		}

    		return this;

    	}

    }

    var ProbabilityDensity = function (x, mean, variance) {

    	return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(- (Math.pow((x - mean), 2)) / (2 * variance));

    };

    const FuzzySetClasses = {
        leftShoulder: LeftShoulderFuzzySet,
        leftSCurve: LeftSCurveFuzzySet,

        rightShoulder: RightShoulderFuzzySet,
        rightSCurve: RightSCurveFuzzySet,

        triangular: TriangularFuzzySet,
        singleton: SingletonFuzzySet,
        normal: NormalDistFuzzySet
    };

    var BuildFuzzySet = function (config, partType) {
        var setType = config.type;
        if (setType === undefined) {
            setType = (partType === 0) ? 'leftShoulder' :  // Left part
                (partType === 2) ? 'rightShoulder' :       // Right part
                    'triangular';                          // Middle part
        }

        var fuzzySet = new FuzzySetClasses[setType](...config.parameters);
        return fuzzySet;
    };

    var BuildFuzzyVariable = function (setsConfig) {
        var flv = new FuzzyVariable();
        for (var i = 0, cnt = setsConfig.length; i < cnt; i++) {
            var flvConfig = setsConfig[i]; // [setName, setType, left, middle, right, arg0]
            var fuzzySet = BuildFuzzySet(
                flvConfig,
                (i === 0) ? 0 : ((i == cnt - 1) ? 2 : 3)
            );
            fuzzySet.name = flvConfig.name;
            flv.add(fuzzySet);
        }
        return flv;
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var parser$1 = {};

    /* parser generated by jison 0.4.18 */

    (function (exports) {
    	/*
    	  Returns a Parser object of the following structure:

    	  Parser: {
    	    yy: {}
    	  }

    	  Parser.prototype: {
    	    yy: {},
    	    trace: function(),
    	    symbols_: {associative list: name ==> number},
    	    terminals_: {associative list: number ==> name},
    	    productions_: [...],
    	    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    	    table: [...],
    	    defaultActions: {...},
    	    parseError: function(str, hash),
    	    parse: function(input),

    	    lexer: {
    	        EOF: 1,
    	        parseError: function(str, hash),
    	        setInput: function(input),
    	        input: function(),
    	        unput: function(str),
    	        more: function(),
    	        less: function(n),
    	        pastInput: function(),
    	        upcomingInput: function(),
    	        showPosition: function(),
    	        test_match: function(regex_match_array, rule_index),
    	        next: function(),
    	        lex: function(),
    	        begin: function(condition),
    	        popState: function(),
    	        _currentRules: function(),
    	        topState: function(),
    	        pushState: function(condition),

    	        options: {
    	            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
    	            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
    	            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
    	        },

    	        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
    	        rules: [...],
    	        conditions: {associative list: name ==> set},
    	    }
    	  }


    	  token location info (@$, _$, etc.): {
    	    first_line: n,
    	    last_line: n,
    	    first_column: n,
    	    last_column: n,
    	    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
    	  }


    	  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    	    text:        (matched text)
    	    token:       (the produced terminal token, if any)
    	    line:        (yylineno)
    	  }
    	  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    	    loc:         (yylloc)
    	    expected:    (string describing the set of expected tokens)
    	    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
    	  }
    	*/
    	var parser = (function(){
    	var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[1,10],$V4=[1,11],$V5=[1,12],$V6=[2,14],$V7=[1,15],$V8=[5,16,17],$V9=[5,13,14,16,17];
    	var parser = {trace: function trace () { },
    	yy: {},
    	symbols_: {"error":2,"expressions":3,"varExp":4,"EOF":5,"ruleExp":6,"NAME":7,":":8,"NUMBER":9,",":10,"VERY":11,"FAIRLY":12,"AND":13,"OR":14,"(":15,")":16,"=>":17,"$accept":0,"$end":1},
    	terminals_: {2:"error",5:"EOF",7:"NAME",8:":",9:"NUMBER",10:",",11:"VERY",12:"FAIRLY",13:"AND",14:"OR",15:"(",16:")",17:"=>"},
    	productions_: [0,[3,2],[3,2],[4,11],[4,9],[4,7],[4,5],[4,7],[6,2],[6,2],[6,3],[6,3],[6,3],[6,3],[6,1]],
    	performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
    	/* this == yyval */

    	var $0 = $$.length - 1;
    	switch (yystate) {
    	case 1: case 2:
    	return $$[$0-1];
    	case 3:

    	            var setName = $$[$0-10], setType = $$[$0];
    	            var left = Number($$[$0-8]), middle = Number($$[$0-6]), right = Number($$[$0-4]),
    	                arg0 = Number($$[$0-2]);
    	            this.$ = {
    	                name: setName, type: setType,
    	                parameters: [left, middle, right, arg0],
    	            };
    	        
    	break;
    	case 4:

    	            var setName = $$[$0-8], setType = $$[$0];
    	            var left = Number($$[$0-6]), middle = Number($$[$0-4]), right = Number($$[$0-2]);
    	            this.$ = {
    	                name: setName, type: setType,
    	                parameters: [left, middle, right],
    	            };
    	        
    	break;
    	case 5:

    	            var setName = $$[$0-6], setType = undefined;
    	            var left = Number($$[$0-4]), middle = Number($$[$0-2]), right = Number($$[$0]);
    	            this.$ = {
    	                name: setName, type: setType,
    	                parameters: [left, middle, right],
    	            };
    	        
    	break;
    	case 6:

    	            var setName = $$[$0-4], setType = undefined;
    	            var left = Number($$[$0-2]), right = Number($$[$0]), middle = (left+right)/2;
    	            this.$ = {
    	                name: setName, type: setType,
    	                parameters: [left, middle, right],
    	            };
    	        
    	break;
    	case 7:

    	            var setName = $$[$0-6], setType = $$[$0];
    	            var left = Number($$[$0-4]), right = Number($$[$0-2]), middle = (left+right)/2;
    	            this.$ = {
    	                name: setName, type: setType,
    	                parameters: [left, middle, right],
    	            };
    	        
    	break;
    	case 8: case 9:
    	            
    	            this.$ = GetOperator1($$[$0-1], $$[$0]);
    	        
    	break;
    	case 10: case 11:

    	            this.$ = GetOperator2($$[$0-1], $$[$0-2], $$[$0]);
    	        
    	break;
    	case 12:

    	            this.$ = $$[$0-1];
    	        
    	break;
    	case 13:

    	            this.$ = ['=>', $$[$0-2], $$[$0]];
    	        
    	break;
    	case 14:

    	            this.$ = $$[$0];
    	        
    	break;
    	}
    	},
    	table: [{3:1,4:2,6:3,7:[1,4],11:$V0,12:$V1,15:$V2},{1:[3]},{5:[1,8]},{5:[1,9],13:$V3,14:$V4,17:$V5},o([5,13,14,17],$V6,{8:[1,13]}),{6:14,7:$V7,11:$V0,12:$V1,15:$V2},{6:16,7:$V7,11:$V0,12:$V1,15:$V2},{6:17,7:$V7,11:$V0,12:$V1,15:$V2},{1:[2,1]},{1:[2,2]},{6:18,7:$V7,11:$V0,12:$V1,15:$V2},{6:19,7:$V7,11:$V0,12:$V1,15:$V2},{7:[1,20]},{9:[1,21]},o($V8,[2,8],{13:$V3,14:$V4}),o($V9,$V6),o($V8,[2,9],{13:$V3,14:$V4}),{13:$V3,14:$V4,16:[1,22],17:$V5},o([5,13,16,17],[2,10],{14:$V4}),o($V9,[2,11]),o($V9,[2,13]),{10:[1,23]},o($V9,[2,12]),{9:[1,24]},{5:[2,6],10:[1,25]},{7:[1,27],9:[1,26]},{5:[2,5],10:[1,28]},{5:[2,7]},{7:[1,30],9:[1,29]},{10:[1,31]},{5:[2,4]},{7:[1,32]},{5:[2,3]}],
    	defaultActions: {8:[2,1],9:[2,2],27:[2,7],30:[2,4],32:[2,3]},
    	parseError: function parseError (str, hash) {
    	    if (hash.recoverable) {
    	        this.trace(str);
    	    } else {
    	        var error = new Error(str);
    	        error.hash = hash;
    	        throw error;
    	    }
    	},
    	parse: function parse(input) {
    	    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
    	    var args = lstack.slice.call(arguments, 1);
    	    var lexer = Object.create(this.lexer);
    	    var sharedState = { yy: {} };
    	    for (var k in this.yy) {
    	        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
    	            sharedState.yy[k] = this.yy[k];
    	        }
    	    }
    	    lexer.setInput(input, sharedState.yy);
    	    sharedState.yy.lexer = lexer;
    	    sharedState.yy.parser = this;
    	    if (typeof lexer.yylloc == 'undefined') {
    	        lexer.yylloc = {};
    	    }
    	    var yyloc = lexer.yylloc;
    	    lstack.push(yyloc);
    	    var ranges = lexer.options && lexer.options.ranges;
    	    if (typeof sharedState.yy.parseError === 'function') {
    	        this.parseError = sharedState.yy.parseError;
    	    } else {
    	        this.parseError = Object.getPrototypeOf(this).parseError;
    	    }
    	    var lex = function () {
    	            var token;
    	            token = lexer.lex() || EOF;
    	            if (typeof token !== 'number') {
    	                token = self.symbols_[token] || token;
    	            }
    	            return token;
    	        };
    	    var symbol, state, action, r, yyval = {}, p, len, newState, expected;
    	    while (true) {
    	        state = stack[stack.length - 1];
    	        if (this.defaultActions[state]) {
    	            action = this.defaultActions[state];
    	        } else {
    	            if (symbol === null || typeof symbol == 'undefined') {
    	                symbol = lex();
    	            }
    	            action = table[state] && table[state][symbol];
    	        }
    	                    if (typeof action === 'undefined' || !action.length || !action[0]) {
    	                var errStr = '';
    	                expected = [];
    	                for (p in table[state]) {
    	                    if (this.terminals_[p] && p > TERROR) {
    	                        expected.push('\'' + this.terminals_[p] + '\'');
    	                    }
    	                }
    	                if (lexer.showPosition) {
    	                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
    	                } else {
    	                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
    	                }
    	                this.parseError(errStr, {
    	                    text: lexer.match,
    	                    token: this.terminals_[symbol] || symbol,
    	                    line: lexer.yylineno,
    	                    loc: yyloc,
    	                    expected: expected
    	                });
    	            }
    	        if (action[0] instanceof Array && action.length > 1) {
    	            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
    	        }
    	        switch (action[0]) {
    	        case 1:
    	            stack.push(symbol);
    	            vstack.push(lexer.yytext);
    	            lstack.push(lexer.yylloc);
    	            stack.push(action[1]);
    	            symbol = null;
    	            {
    	                yyleng = lexer.yyleng;
    	                yytext = lexer.yytext;
    	                yylineno = lexer.yylineno;
    	                yyloc = lexer.yylloc;
    	            }
    	            break;
    	        case 2:
    	            len = this.productions_[action[1]][1];
    	            yyval.$ = vstack[vstack.length - len];
    	            yyval._$ = {
    	                first_line: lstack[lstack.length - (len || 1)].first_line,
    	                last_line: lstack[lstack.length - 1].last_line,
    	                first_column: lstack[lstack.length - (len || 1)].first_column,
    	                last_column: lstack[lstack.length - 1].last_column
    	            };
    	            if (ranges) {
    	                yyval._$.range = [
    	                    lstack[lstack.length - (len || 1)].range[0],
    	                    lstack[lstack.length - 1].range[1]
    	                ];
    	            }
    	            r = this.performAction.apply(yyval, [
    	                yytext,
    	                yyleng,
    	                yylineno,
    	                sharedState.yy,
    	                action[1],
    	                vstack,
    	                lstack
    	            ].concat(args));
    	            if (typeof r !== 'undefined') {
    	                return r;
    	            }
    	            if (len) {
    	                stack = stack.slice(0, -1 * len * 2);
    	                vstack = vstack.slice(0, -1 * len);
    	                lstack = lstack.slice(0, -1 * len);
    	            }
    	            stack.push(this.productions_[action[1]][0]);
    	            vstack.push(yyval.$);
    	            lstack.push(yyval._$);
    	            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
    	            stack.push(newState);
    	            break;
    	        case 3:
    	            return true;
    	        }
    	    }
    	    return true;
    	}};

    	    function GetOperator1(operator, op1) {
    	        operator = operator.toLowerCase();
    	        return [operator, op1];
    	    }

    	    function GetOperator2(operator, op1, op2) {
    	        operator = operator.toLowerCase();
    	        var result = [operator];
    	        if (Array.isArray(op1) && (op1[0] === operator)) {
    	            for(var i=1, cnt=op1.length; i<cnt; i++) {
    	                result.push(op1[i]);
    	            }
    	        } else {
    	            result.push(op1);
    	        }
    	        if (Array.isArray(op2) && (op2[0] === operator)) {
    	            for(var i=1, cnt=op2.length; i<cnt; i++) {
    	                result.push(op2[i]);
    	            }
    	        } else {
    	            result.push(op2);
    	        }
    	        return result;
    	    }
    	/* generated by jison-lex 0.3.4 */
    	var lexer = (function(){
    	var lexer = ({

    	EOF:1,

    	parseError:function parseError(str, hash) {
    	        if (this.yy.parser) {
    	            this.yy.parser.parseError(str, hash);
    	        } else {
    	            throw new Error(str);
    	        }
    	    },

    	// resets the lexer, sets new input
    	setInput:function (input, yy) {
    	        this.yy = yy || this.yy || {};
    	        this._input = input;
    	        this._more = this._backtrack = this.done = false;
    	        this.yylineno = this.yyleng = 0;
    	        this.yytext = this.matched = this.match = '';
    	        this.conditionStack = ['INITIAL'];
    	        this.yylloc = {
    	            first_line: 1,
    	            first_column: 0,
    	            last_line: 1,
    	            last_column: 0
    	        };
    	        if (this.options.ranges) {
    	            this.yylloc.range = [0,0];
    	        }
    	        this.offset = 0;
    	        return this;
    	    },

    	// consumes and returns one char from the input
    	input:function () {
    	        var ch = this._input[0];
    	        this.yytext += ch;
    	        this.yyleng++;
    	        this.offset++;
    	        this.match += ch;
    	        this.matched += ch;
    	        var lines = ch.match(/(?:\r\n?|\n).*/g);
    	        if (lines) {
    	            this.yylineno++;
    	            this.yylloc.last_line++;
    	        } else {
    	            this.yylloc.last_column++;
    	        }
    	        if (this.options.ranges) {
    	            this.yylloc.range[1]++;
    	        }

    	        this._input = this._input.slice(1);
    	        return ch;
    	    },

    	// unshifts one char (or a string) into the input
    	unput:function (ch) {
    	        var len = ch.length;
    	        var lines = ch.split(/(?:\r\n?|\n)/g);

    	        this._input = ch + this._input;
    	        this.yytext = this.yytext.substr(0, this.yytext.length - len);
    	        //this.yyleng -= len;
    	        this.offset -= len;
    	        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
    	        this.match = this.match.substr(0, this.match.length - 1);
    	        this.matched = this.matched.substr(0, this.matched.length - 1);

    	        if (lines.length - 1) {
    	            this.yylineno -= lines.length - 1;
    	        }
    	        var r = this.yylloc.range;

    	        this.yylloc = {
    	            first_line: this.yylloc.first_line,
    	            last_line: this.yylineno + 1,
    	            first_column: this.yylloc.first_column,
    	            last_column: lines ?
    	                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
    	                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
    	              this.yylloc.first_column - len
    	        };

    	        if (this.options.ranges) {
    	            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
    	        }
    	        this.yyleng = this.yytext.length;
    	        return this;
    	    },

    	// When called from action, caches matched text and appends it on next action
    	more:function () {
    	        this._more = true;
    	        return this;
    	    },

    	// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
    	reject:function () {
    	        if (this.options.backtrack_lexer) {
    	            this._backtrack = true;
    	        } else {
    	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
    	                text: "",
    	                token: null,
    	                line: this.yylineno
    	            });

    	        }
    	        return this;
    	    },

    	// retain first n characters of the match
    	less:function (n) {
    	        this.unput(this.match.slice(n));
    	    },

    	// displays already matched input, i.e. for error messages
    	pastInput:function () {
    	        var past = this.matched.substr(0, this.matched.length - this.match.length);
    	        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    	    },

    	// displays upcoming input, i.e. for error messages
    	upcomingInput:function () {
    	        var next = this.match;
    	        if (next.length < 20) {
    	            next += this._input.substr(0, 20-next.length);
    	        }
    	        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    	    },

    	// displays the character position where the lexing error occurred, i.e. for error messages
    	showPosition:function () {
    	        var pre = this.pastInput();
    	        var c = new Array(pre.length + 1).join("-");
    	        return pre + this.upcomingInput() + "\n" + c + "^";
    	    },

    	// test the lexed token: return FALSE when not a match, otherwise return token
    	test_match:function(match, indexed_rule) {
    	        var token,
    	            lines,
    	            backup;

    	        if (this.options.backtrack_lexer) {
    	            // save context
    	            backup = {
    	                yylineno: this.yylineno,
    	                yylloc: {
    	                    first_line: this.yylloc.first_line,
    	                    last_line: this.last_line,
    	                    first_column: this.yylloc.first_column,
    	                    last_column: this.yylloc.last_column
    	                },
    	                yytext: this.yytext,
    	                match: this.match,
    	                matches: this.matches,
    	                matched: this.matched,
    	                yyleng: this.yyleng,
    	                offset: this.offset,
    	                _more: this._more,
    	                _input: this._input,
    	                yy: this.yy,
    	                conditionStack: this.conditionStack.slice(0),
    	                done: this.done
    	            };
    	            if (this.options.ranges) {
    	                backup.yylloc.range = this.yylloc.range.slice(0);
    	            }
    	        }

    	        lines = match[0].match(/(?:\r\n?|\n).*/g);
    	        if (lines) {
    	            this.yylineno += lines.length;
    	        }
    	        this.yylloc = {
    	            first_line: this.yylloc.last_line,
    	            last_line: this.yylineno + 1,
    	            first_column: this.yylloc.last_column,
    	            last_column: lines ?
    	                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
    	                         this.yylloc.last_column + match[0].length
    	        };
    	        this.yytext += match[0];
    	        this.match += match[0];
    	        this.matches = match;
    	        this.yyleng = this.yytext.length;
    	        if (this.options.ranges) {
    	            this.yylloc.range = [this.offset, this.offset += this.yyleng];
    	        }
    	        this._more = false;
    	        this._backtrack = false;
    	        this._input = this._input.slice(match[0].length);
    	        this.matched += match[0];
    	        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
    	        if (this.done && this._input) {
    	            this.done = false;
    	        }
    	        if (token) {
    	            return token;
    	        } else if (this._backtrack) {
    	            // recover context
    	            for (var k in backup) {
    	                this[k] = backup[k];
    	            }
    	            return false; // rule action called reject() implying the next rule should be tested instead.
    	        }
    	        return false;
    	    },

    	// return next match in input
    	next:function () {
    	        if (this.done) {
    	            return this.EOF;
    	        }
    	        if (!this._input) {
    	            this.done = true;
    	        }

    	        var token,
    	            match,
    	            tempMatch,
    	            index;
    	        if (!this._more) {
    	            this.yytext = '';
    	            this.match = '';
    	        }
    	        var rules = this._currentRules();
    	        for (var i = 0; i < rules.length; i++) {
    	            tempMatch = this._input.match(this.rules[rules[i]]);
    	            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
    	                match = tempMatch;
    	                index = i;
    	                if (this.options.backtrack_lexer) {
    	                    token = this.test_match(tempMatch, rules[i]);
    	                    if (token !== false) {
    	                        return token;
    	                    } else if (this._backtrack) {
    	                        match = false;
    	                        continue; // rule action called reject() implying a rule MISmatch.
    	                    } else {
    	                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
    	                        return false;
    	                    }
    	                } else if (!this.options.flex) {
    	                    break;
    	                }
    	            }
    	        }
    	        if (match) {
    	            token = this.test_match(match, rules[index]);
    	            if (token !== false) {
    	                return token;
    	            }
    	            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
    	            return false;
    	        }
    	        if (this._input === "") {
    	            return this.EOF;
    	        } else {
    	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
    	                text: "",
    	                token: null,
    	                line: this.yylineno
    	            });
    	        }
    	    },

    	// return next match that has a token
    	lex:function lex () {
    	        var r = this.next();
    	        if (r) {
    	            return r;
    	        } else {
    	            return this.lex();
    	        }
    	    },

    	// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
    	begin:function begin (condition) {
    	        this.conditionStack.push(condition);
    	    },

    	// pop the previously active lexer condition state off the condition stack
    	popState:function popState () {
    	        var n = this.conditionStack.length - 1;
    	        if (n > 0) {
    	            return this.conditionStack.pop();
    	        } else {
    	            return this.conditionStack[0];
    	        }
    	    },

    	// produce the lexer rule set which is active for the currently active lexer condition state
    	_currentRules:function _currentRules () {
    	        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
    	            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
    	        } else {
    	            return this.conditions["INITIAL"].rules;
    	        }
    	    },

    	// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
    	topState:function topState (n) {
    	        n = this.conditionStack.length - 1 - Math.abs(n || 0);
    	        if (n >= 0) {
    	            return this.conditionStack[n];
    	        } else {
    	            return "INITIAL";
    	        }
    	    },

    	// alias for begin(condition)
    	pushState:function pushState (condition) {
    	        this.begin(condition);
    	    },

    	// return the number of states currently on the stack
    	stateStackSize:function stateStackSize() {
    	        return this.conditionStack.length;
    	    },
    	options: {},
    	performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    	switch($avoiding_name_collisions) {
    	case 0:/* skip whitespace */
    	break;
    	case 1:return ":"
    	case 2:return ","
    	case 3:return 17
    	case 4:return 14
    	case 5:return 14
    	case 6:return 13
    	case 7:return 13
    	case 8:return 11
    	case 9:return 11
    	case 10:return 12
    	case 11:return 12
    	case 12:return 15
    	case 13:return 16
    	case 14:return 9
    	case 15:return 7
    	case 16:return 5
    	case 17:return 'INVALID'
    	}
    	},
    	rules: [/^(?:\s+)/,/^(?::)/,/^(?:,)/,/^(?:=>)/,/^(?:or\b)/,/^(?:OR\b)/,/^(?:and\b)/,/^(?:AND\b)/,/^(?:very\b)/,/^(?:VERY\b)/,/^(?:fairly\b)/,/^(?:FAIRLY\b)/,/^(?:\()/,/^(?:\))/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[0-9a-zA-Z_.]+[+-]*)/,/^(?:$)/,/^(?:.)/],
    	conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}}
    	});
    	return lexer;
    	})();
    	parser.lexer = lexer;
    	function Parser () {
    	  this.yy = {};
    	}
    	Parser.prototype = parser;parser.Parser = Parser;
    	return new Parser;
    	})();


    	if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
    	exports.parser = parser;
    	exports.Parser = parser.Parser;
    	exports.parse = function () { return parser.parse.apply(parser, arguments); };
    	} 
    } (parser$1));

    var parser = /*@__PURE__*/getDefaultExportFromCjs(parser$1);

    const Parser = new parser.Parser();
    var Parse = function (input) {
        return Parser.parse(input);
    };

    var IsInvalidLine = function (line) {
        // Is empty line
        if (line.length === 0 || !line.trim()) {
            return true;
        }
        // Is comment line
        if (line.trimStart().substring(0, 2) === '//') {
            return true;
        }
    };

    var BuildFuzzyVariables = function (fuzzyModule, variables) {
        // String -> FuzzySets array
        if (typeof (variables) === 'string') {
            variables = variables.split('\n');
        }

        // FuzzySets array -> Variables dictionary
        if (Array.isArray(variables)) {  // Fuzzy sets in array
            var lines = variables;
            variables = [];
            for (var i = 0, cnt = lines.length; i < cnt; i++) {
                var line = lines[i];
                if (typeof (line) !== 'string') {
                    variables.push(line);
                    continue;
                }

                // Fuzzy set might be string
                if (IsInvalidLine(line)) {
                    continue;
                }
                variables.push(Parse(line));
            }
            // Bind fuzzy set to variables
            variables = BindFuzzySets(variables);
        }

        for (var name in variables) {
            var flv = BuildFuzzyVariable(variables[name]);
            fuzzyModule.addFLV(name, flv);
        }
    };

    var BindFuzzySets = function (fuzzySets) {
        var variables = {};
        for (var i = 0, cnt = fuzzySets.length; i < cnt; i++) {
            var fuzzySet = fuzzySets[i];
            var variableName = GetVariableName(fuzzySet.name);
            if (!variables.hasOwnProperty(variableName)) {
                variables[variableName] = [];
            }
            variables[variableName].push(fuzzySet);
        }
        return variables;
    };

    var GetAllFuzzySets = function (fuzzyModule) {
        var allFuzzySets = {};
        var flvs = fuzzyModule.flvs;
        for (var name in flvs) {
            var FLVFuzzySets = flvs[name].fuzzySets;
            for (var i = 0, cnt = FLVFuzzySets.length; i < cnt; i++) {
                var fuzzySet = FLVFuzzySets[i];
                allFuzzySets[fuzzySet.name] = fuzzySet;
            }
        }
        return allFuzzySets;
    };

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    */
    class FuzzyRule {
    	constructor(antecedent, consequence) {
    		this.antecedent = antecedent;
    		this.consequence = consequence;

    	}

    	initConsequence() {
    		this.consequence.clearDegreeOfMembership();
    		return this;
    	}

    	evaluate() {
    		this.consequence.updateDegreeOfMembership(this.antecedent.getDegreeOfMembership());
    		return this;

    	}
    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyTerm
    */
    class FuzzyCompositeTerm {

    	constructor(terms) {
    		this.terms = terms;
    	}

    	clearDegreeOfMembership() {
    		const terms = this.terms;
    		for (let i = 0, l = terms.length; i < l; i++) {
    			terms[i].clearDegreeOfMembership();

    		}

    		return this;
    	}

    	updateDegreeOfMembership(value) {
    		const terms = this.terms;
    		for (let i = 0, l = terms.length; i < l; i++) {
    			terms[i].updateDegreeOfMembership(value);

    		}

    		return this;

    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyCompositeTerm
    */
    class FuzzyAND extends FuzzyCompositeTerm {
    	constructor() {
    		const terms = Array.from(arguments);
    		super(terms);
    	}

    	getDegreeOfMembership() {
    		const terms = this.terms;
    		let minDOM = Infinity;
    		for (let i = 0, l = terms.length; i < l; i++) {
    			const currentDOM = terms[i].getDegreeOfMembership();
    			if (currentDOM < minDOM) {
    				minDOM = currentDOM;
    			}

    		}

    		return minDOM;

    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyCompositeTerm
    */
    class FuzzyOR extends FuzzyCompositeTerm {
    	constructor() {
    		const terms = Array.from(arguments);
    		super(terms);
    	}

    	getDegreeOfMembership() {
    		const terms = this.terms;
    		let maxDOM = -Infinity;
    		for (let i = 0, l = terms.length; i < l; i++) {
    			const currentDOM = terms[i].getDegreeOfMembership();
    			if (currentDOM > maxDOM) {
    				maxDOM = currentDOM;
    			}

    		}

    		return maxDOM;
    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyCompositeTerm
    */
    class FuzzyFAIRLY extends FuzzyCompositeTerm {

    	constructor(fuzzyTerm) {
    		super([fuzzyTerm]);
    	}

    	clearDegreeOfMembership() {
    		this.terms[0].clearDegreeOfMembership();
    		return this;
    	}

    	getDegreeOfMembership() {
    		const dom = this.terms[0].getDegreeOfMembership();
    		return Math.sqrt(dom);
    	}

    	updateDegreeOfMembership(value) {
    		this.terms[0].updateDegreeOfMembership(Math.sqrt(value));
    		return this;
    	}

    }

    /**
    * @author {@link https://github.com/Mugen87|Mugen87}
    * @augments FuzzyCompositeTerm
    */
    class FuzzyVERY extends FuzzyCompositeTerm {

    	constructor(fuzzyTerm = null) {
    		super([fuzzyTerm]);
    	}

    	clearDegreeOfMembership() {
    		this.terms[0].clearDegreeOfMembership();
    		return this;

    	}

    	getDegreeOfMembership() {
    		const dom = this.terms[0].getDegreeOfMembership();
    		return dom * dom;

    	}

    	updateDegreeOfMembership(value) {
    		this.terms[0].updateDegreeOfMembership(value * value);
    		return this;
    	}

    }

    var BuildFuzzyRule = function (ruleInput, fuzzySets) {
        var ruleJson = Parse(ruleInput);
        var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
        var consequence = fuzzySets[ruleJson[2]];
        var rule = new FuzzyRule(antecedent, consequence);
        return rule;
    };

    var BuildFuzzyCompositeTerm = function (terms, fuzzySets) {
        // terms: undefined, string, or array
        if (!terms) {
            return null;
        } else if (typeof (terms) === 'string') {
            if (!fuzzySets.hasOwnProperty(terms)) {
                throw `Can't find fuzzy set ${terms}`;
            }
            return fuzzySets[terms];
        }

        // Array
        var operations = [];
        for (var i = 1, cnt = terms.length; i < cnt; i++) {
            operations.push(BuildFuzzyCompositeTerm(terms[i], fuzzySets));
        }
        var operatorClass = OperatorClasses[terms[0]];
        var operator = new operatorClass(...operations);
        return operator;
    };

    const OperatorClasses = {
        and: FuzzyAND,
        or: FuzzyOR,
        fairly: FuzzyFAIRLY,
        very: FuzzyVERY
    };

    var BuildFuzzyRules = function (fuzzyModule, rules, fuzzySets) {
        if (typeof (rules) === 'string') {
            rules = rules.split('\n');
        }
        for (var i = 0, cnt = rules.length; i < cnt; i++) {
            var rule = rules[i];
            if (IsInvalidLine(rule)) {
                continue;
            }
            fuzzyModule.addRule(BuildFuzzyRule(rule, fuzzySets));
        }
    };

    var BuildFuzzyModule = function (config) {
        if (typeof (config) === 'string') {
            var variables = [];
            var rules = [];
            var lines = config.split('\n');
            for (var i = 0, cnt = lines.length; i < cnt; i++) {
                var line = lines[i];
                if (IsInvalidLine(line)) {
                    continue;
                }
                if (line.indexOf('=>') !== -1) {
                    rules.push(line);
                } else {
                    variables.push(line);
                }
            }
            config = {
                variables: variables,
                rules: rules
            };
        }

        var fuzzyModule = new FuzzyModule();
        BuildFuzzyVariables(fuzzyModule, config.variables);
        BuildFuzzyRules(fuzzyModule, config.rules, GetAllFuzzySets(fuzzyModule));

        return fuzzyModule;
    };

    class FuzzyPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(config) {
            return BuildFuzzyModule(config);
        }

    }

    return FuzzyPlugin;

}));
