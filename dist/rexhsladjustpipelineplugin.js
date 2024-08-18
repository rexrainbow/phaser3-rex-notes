(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhsladjustpipelineplugin = factory());
})(this, (function () { 'use strict';

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
uniform float hueRotate;
uniform float satAdjust;
uniform float lumAdjust;
`
	+ frag$3 + frag$1 + 
`\
void main(void) {
	vec4 front = texture2D(uMainSampler, outTexCoord);
	vec3 hsl = RGBToHSL(front.rgb);
	hsl.x -= hueRotate;
	hsl.y *= satAdjust;
	hsl.z += (lumAdjust - 0.5) * front.a;
	vec3 rgb = HSLToRGB(hsl);
	gl_FragColor = vec4(rgb, front.a);
}
`	;

	const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
	const GetValue = Phaser.Utils.Objects.GetValue;

	class HslAdjustPostFxPipeline extends PostFXPipeline {
	    constructor(game) {
	        super({
	            name: 'rexHslAdjustPostFx',
	            game: game,
	            renderTarget: true,
	            fragShader: frag
	        });

	        this.hueRotate = 0;
	        this.satAdjust = 1;
	        this.lumAdjust = 0.5;
	    }

	    resetFromJSON(o) {
	        this.setHueRotate(GetValue(o, 'hueRotate', 0));
	        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
	        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
	        return this;
	    }

	    onPreRender() {
	        this.set1f('hueRotate', (this.hueRotate) % 1);
	        this.set1f('satAdjust', this.satAdjust);
	        this.set1f('lumAdjust', this.lumAdjust);
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

	var RegisterPostPipeline = function (game, postFxPipelineName, PostFxPipelineClass) {
	    GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
	};

	var AddPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, config) {
	    if (config === undefined) {
	        config = {};
	    }

	    gameObject.setPostPipeline(PostFxPipelineClass);
	    var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
	    pipeline.resetFromJSON(config);

	    if (config.name) {
	        pipeline.name = config.name;
	    }

	    return pipeline;
	};

	const SpliceOne = Phaser.Utils.Array.SpliceOne;

	var RemovePostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {
	    if (name === undefined) {
	        var pipelines = gameObject.postPipelines;
	        for (var i = (pipelines.length - 1); i >= 0; i--) {
	            var instance = pipelines[i];
	            if (instance instanceof PostFxPipelineClass) {
	                instance.destroy();
	                SpliceOne(pipelines, i);
	            }
	        }
	    } else {
	        var pipelines = gameObject.postPipelines;
	        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
	            var instance = pipelines[i];
	            if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
	                instance.destroy();
	                SpliceOne(pipelines, i);
	            }
	        }
	    }

	    gameObject.hasPostPipeline = (gameObject.postPipelines.length > 0);

	};

	var GetPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {    
	    if (name === undefined) {
	        var result = [];
	        var pipelines = gameObject.postPipelines;
	        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
	            var instance = pipelines[i];
	            if (instance instanceof PostFxPipelineClass) {
	                result.push(instance);
	            }
	        }
	        return result;
	    } else {
	        var pipelines = gameObject.postPipelines;
	        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
	            var instance = pipelines[i];
	            if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
	                return instance;
	            }
	        }
	    }
	};

	class BasePostFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
	    setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
	        this.PostFxPipelineClass = PostFxPipelineClass;
	        this.postFxPipelineName = postFxPipelineName;
	        return this;
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.once('destroy', this.destroy, this);

	        RegisterPostPipeline(this.game, this.postFxPipelineName, this.PostFxPipelineClass);
	    }

	    add(gameObject, config) {
	        return AddPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, config);
	    }

	    remove(gameObject, name) {
	        RemovePostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
	        return this;
	    }

	    get(gameObject, name) {
	        return GetPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
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

	class HslAdjustPipelinePlugin extends BasePostFxPipelinePlugin {
	    constructor(pluginManager) {
	        super(pluginManager);
	        this.setPostPipelineClass(HslAdjustPostFxPipeline, 'rexHslAdjustPostFx');
	    }
	}

	SetValue(window, 'RexPlugins.Pipelines.HslAdjustPostFx', HslAdjustPostFxPipeline);

	return HslAdjustPipelinePlugin;

}));
