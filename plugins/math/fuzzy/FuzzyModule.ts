import GetVariableName from './utils/GetVariableName';

// https://github.com/Mugen87/yuka
/**
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class FuzzyModule {
    dirty: any;
    flvs: any;
    rules: any;

	constructor() {
		this.rules = [];
		this.flvs = {};

	}

	addFLV(name?: any, flv?: any) {
		this.flvs[name] = flv;
		return this;

	}

	removeFLV(name?: any) {
		delete this.flvs[name];
		return this;

	}

	hasFLV(name?: any) {
		return this.flvs.hasOwnProperty(name);
	}

	addRule(rule?: any) {
		this.rules.push(rule);
		return this;

	}

	removeRule(rule?: any) {
		const rules = this.rules;
		const index = rules.indexOf(rule);
		rules.splice(index, 1);
		return this;

	}

	fuzzify(name?: any, value?: any) {
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

	_fuzzify(name?: any, value?: any) {
		if (!this.hasFLV(name)) {
			return;
		}

		this.flvs[name].fuzzify(value);
	}

	defuzzify(name?: any, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {

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

	_defuzzify(name?: any, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {
		if (!this.hasFLV(name)) {
			return;
		}

		const flv = this.flvs[name];

		let value;
		switch (type?: any) {
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

export default FuzzyModule;