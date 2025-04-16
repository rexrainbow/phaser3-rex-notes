(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhsladjustfilterplugin = factory());
})(this, (function () { 'use strict';

	const FilterName = 'rexFilterHslAdjust';

	const frag$3 = `\
vec3 RGBToHSL(vec3 color) {
  vec3 hsl = vec3(0.0, 0.0, 0.0);
	
  float fmin = min(min(color.r, color.g), color.b);
  float fmax = max(max(color.r, color.g), color.b);
  float delta = fmax - fmin;

  hsl.z = (fmax + fmin) / 2.0;

  if (delta == 0.0) {
		hsl.x = 0.0;
		hsl.y = 0.0;
	} else {
		if (hsl.z < 0.5) {
			hsl.y = delta / (fmax + fmin);
    } else {
      hsl.y = delta / (2.0 - fmax - fmin);
    }
		
		float dR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
		float dG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
		float dB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

		if (color.r == fmax) {
			hsl.x = dB - dG;
    } else if (color.g == fmax) {
			hsl.x = (1.0 / 3.0) + dR - dB;
		} else if (color.b == fmax) {
      hsl.x = (2.0 / 3.0) + dG - dR;
    }

		if (hsl.x < 0.0) {
			hsl.x += 1.0;
    } else if (hsl.x > 1.0) {
      hsl.x -= 1.0;
    }
	}

	return hsl;
}
`;

	const frag$2 = `\
float HUEToRGB(float f1, float f2, float hue) {
  if (hue < 0.0) {
    hue += 1.0;
  } else if (hue > 1.0) {
    hue -= 1.0;
  }
   	
  float ret;
	
	if ((6.0 * hue) < 1.0) {
		ret = f1 + (f2 - f1) * 6.0 * hue;
  } else if ((2.0 * hue) < 1.0) {
		ret = f2;
	} else if ((3.0 * hue) < 2.0) {
		ret = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
  } else {
      ret = f1;
  }
	
  return ret;
}
`;

	const frag$1 = frag$2 + 
`\
vec3 HSLToRGB(vec3 hsl) {
	vec3 rgb = vec3(hsl.z);
	
	if (hsl.y != 0.0) {
		float f2;
		
		if (hsl.z < 0.5) {
		  f2 = hsl.z * (1.0 + hsl.y);
    } else {
      f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
    }
			
		float f1 = 2.0 * hsl.z - f2;
		
		rgb.r = HUEToRGB(f1, f2, hsl.x + (1.0 / 3.0));
		rgb.g = HUEToRGB(f1, f2, hsl.x);
		rgb.b = HUEToRGB(f1, f2, hsl.x - (1.0 / 3.0));
  }
  
  return rgb;
}
`	;

	const frag = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters

uniform vec3 hsvAdjust;
`
	+ frag$3 + frag$1 + 
`
#pragma phaserTemplate(fragmentHeader)

void main(void) {
  float hueRotate = hsvAdjust.x;
  float satAdjust = hsvAdjust.y;
  float lumAdjust = hsvAdjust.z;

  vec4 front = texture2D(uMainSampler, outTexCoord);
  vec3 hsl = RGBToHSL(front.rgb);
  hsl.x -= hueRotate;
  hsl.y *= satAdjust;
  hsl.z += (lumAdjust - 0.5) * front.a;
  vec3 rgb = HSLToRGB(hsl);
  gl_FragColor = vec4(rgb, front.a);
}
`	;

	class HslAdjustFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName;

	    constructor(manager) {
	        super(FilterName, manager, null, frag);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        programManager.setUniform('hsvAdjust', [(controller.hueRotate) % 1, controller.satAdjust, controller.lumAdjust]);
	    }
	}

	const GetValue = Phaser.Utils.Objects.GetValue;

	class HslAdjustController extends Phaser.Filters.Controller {
	    static FilterName = FilterName;

	    constructor(camera, config) {
	        super(camera, FilterName);

	        this.hueRotate = 0;
	        this.satAdjust = 1;
	        this.lumAdjust = 0.5;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setHueRotate(GetValue(o, 'hueRotate', 0));
	        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
	        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
	        return this;
	    }

	    // hueRotate
	    setHueRotate(value) {
	        this.hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees
	        return this;
	    }

	    // satAdjust
	    setSatAdjust(value) {
	        this.satAdjust = value;  // 0: gray, 1: original color, > 1: 
	        return this;
	    }

	    // lumAdjust
	    setLumAdjust(value) {
	        this.lumAdjust = value;  // 0: dark, 0.5: original color, 1: white
	        return this;
	    }
	}

	const GameClass = Phaser.Game;
	var IsGame = function (object) {
	    return (object instanceof GameClass);
	};

	const SceneClass = Phaser.Scene;
	var IsSceneObject = function (object) {
	    return (object instanceof SceneClass);
	};

	var GetGame = function (object) {
	    if ((object == null) || (typeof (object) !== 'object')) {
	        return null;
	    } else if (IsGame(object)) {
	        return object;
	    } else if (IsGame(object.game)) {
	        return object.game;
	    } else if (IsSceneObject(object)) { // object = scene object
	        return object.sys.game;
	    } else if (IsSceneObject(object.scene)) { // object = game object
	        return object.scene.sys.game;
	    }
	};

	var RegisterFilter = function (game, FilterClass) {
	    var filterName = FilterClass.FilterName;
	    var renderNodes = GetGame(game).renderer.renderNodes;
	    if (renderNodes.hasNode(filterName)) {
	        return false;
	    }

	    renderNodes.addNodeConstructor(filterName, FilterClass);
	    return true;
	};

	var AddFilterListMethod = function (name, callback) {
	    var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
	    if (FilterListComponent[name]) {
	        return;
	    }

	    FilterListComponent[name] = callback;
	};

	var GetFilterList = function (gameObject, external) {
	    if (external === undefined) {
	        external = false;
	    }

	    if (!gameObject.filters) {
	        gameObject.enableFilters().focusFilters();
	    }

	    var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

	    return filterList;
	};

	var AddController = function (gameObject, ControllerClass, config, external) {
	    if (config === undefined) {
	        config = {};
	    }

	    var filterList = GetFilterList(gameObject, external);

	    var controller = filterList.add(
	        new ControllerClass(filterList.camera, config)
	    );

	    if (config.name) {
	        controller.name = config.name;
	    }

	    return controller;
	};

	const SpliceOne = Phaser.Utils.Array.SpliceOne;

	var RemoveController = function (gameObject, ControllerClass, name, external) {
	    var list = GetFilterList(gameObject, external).list;
	    if (name === undefined) {
	        for (var i = (list.length - 1); i >= 0; i--) {
	            var controller = list[i];
	            if (controller instanceof ControllerClass) {
	                controller.destroy();
	                SpliceOne(controller, i);
	            }
	        }
	    } else {
	        for (var i = 0, cnt = list.length; i < cnt; i++) {
	            var controller = list[i];
	            if ((controller instanceof ControllerClass) && (controller.name === name)) {
	                controller.destroy();
	                SpliceOne(controller, i);
	            }
	        }
	    }

	};

	var GetController = function (gameObject, ControllerClass, name, external) {
	    var list = GetFilterList(gameObject, external).list;
	    if (name === undefined) {
	        var result = [];
	        for (var i = 0, cnt = list.length; i < cnt; i++) {
	            var controller = list[i];
	            if (controller instanceof ControllerClass) {
	                result.push(controller);
	            }
	        }
	        return result;
	    } else {
	        for (var i = 0, cnt = list.length; i < cnt; i++) {
	            var controller = list[i];
	            if ((controller instanceof ControllerClass) && (controller.name === name)) {
	                return controller;
	            }
	        }
	    }
	};

	class FilterPluginBase extends Phaser.Plugins.BasePlugin {
	    setFilterClass(FilterClass, ControllerClass) {
	        this.FilterClass = FilterClass;
	        this.ControllerClass = ControllerClass;
	        return this;
	    }

	    setFilterListMethod(name, callback) {
	        AddFilterListMethod(name, callback);
	        return this;
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.once('destroy', this.destroy, this);

	        if (this.game.isRunning) {
	            RegisterFilter(this.game, this.FilterClass);

	        } else {
	            eventEmitter.once('ready', function () {
	                RegisterFilter(this.game, this.FilterClass);
	            }, this);

	        }

	    }

	    add(gameObject, config, external = false) {
	        return AddController(gameObject, this.ControllerClass, config, external);
	    }

	    remove(gameObject, name, external = false) {
	        RemoveController(gameObject, this.ControllerClass, name, external);
	        return this;
	    }

	    get(gameObject, name, external = false) {
	        return GetController(gameObject, this.ControllerClass, name, external);
	    }
	}

	var IsInValidKey = function (keys) {
	    return (keys == null) || (keys === '') || (keys.length === 0);
	};

	var GetEntry = function (target, keys, defaultEntry) {
	    var entry = target;
	    if (IsInValidKey(keys)) ; else {
	        if (typeof (keys) === 'string') {
	            keys = keys.split('.');
	        }

	        var key;
	        for (var i = 0, cnt = keys.length; i < cnt; i++) {
	            key = keys[i];
	            if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
	                var newEntry;
	                if (i === cnt - 1) {
	                    if (defaultEntry === undefined) {
	                        newEntry = {};
	                    } else {
	                        newEntry = defaultEntry;
	                    }
	                } else {
	                    newEntry = {};
	                }

	                entry[key] = newEntry;
	            }

	            entry = entry[key];
	        }
	    }

	    return entry;
	};

	var SetValue = function (target, keys, value, delimiter) {
	    if (delimiter === undefined) {
	        delimiter = '.';
	    }

	    // no object
	    if (typeof (target) !== 'object') {
	        return;
	    }

	    // invalid key
	    else if (IsInValidKey(keys)) {
	        // don't erase target
	        if (value == null) {
	            return;
	        }
	        // set target to another object
	        else if (typeof (value) === 'object') {
	            target = value;
	        }
	    } else {
	        if (typeof (keys) === 'string') {
	            keys = keys.split(delimiter);
	        }

	        var lastKey = keys.pop();
	        var entry = GetEntry(target, keys);
	        entry[lastKey] = value;
	    }

	    return target;
	};

	class HslAdjustFilterPlugin extends FilterPluginBase {
	    constructor(pluginManager) {
	        super(pluginManager);

	        this.setFilterClass(HslAdjustFilter, HslAdjustController);

	        this.setFilterListMethod(
	            'addRexHslAdjust',
	            function (config) {
	                return this.add(new HslAdjustController(this.camera, config));
	            }
	        );
	    }
	}

	SetValue(window, 'RexPlugins.Filters.HslAdjustFilter', HslAdjustFilter);
	SetValue(window, 'RexPlugins.Filters.HslAdjustController', HslAdjustController);

	return HslAdjustFilterPlugin;

}));
