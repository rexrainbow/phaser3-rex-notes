(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhorrifipipelineplugin = factory());
})(this, (function () { 'use strict';

  const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

uniform float time;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
#define SAMPLES 32.

// Bloom
uniform float bloomEnable;
uniform vec3 bloom;
uniform vec2 bloomTexel;

// Chromatic abberation
uniform float chromaticEnable;
uniform float chabIntensity;

// Vignette
uniform float vignetteEnable;
uniform vec2 vignette;

// Noise
uniform float noiseEnable;
uniform float noiseStrength;
uniform float noiseSeed;

// VHS
uniform float vhsEnable;
uniform float vhsStrength;

// Scanlines
uniform float scanlinesEnable;
uniform float scanStrength;

// CRT
uniform float crtEnable;
uniform vec2 crtSize;


// Noise
float noise(vec2 uv) {
  return fract(sin(uv.x*12.9898+uv.y*78.233)*437.585453*noiseSeed);
}

// VHS
vec4 vhs(vec2 uv) {
  vec2 tcoord = uv;
  tcoord.x += sin(time*noise(uv));
  return texture2D( uMainSampler, tcoord)*vhsStrength;	
}

// Vignette
float vig(vec2 uv) {
  uv *= 1. - uv;
  return ( pow(uv.x*uv.y*vignette.x*10.,vignette.y) );
}

// Chromatic abberation
vec3 chromatic(vec2 uv, float offset) {
  float r = texture2D( uMainSampler, vec2(uv.x+offset, uv.y)).r;
  float g = texture2D( uMainSampler, uv).g;
  float b = texture2D( uMainSampler, vec2(uv.x-offset, uv.y)).b;
  return vec3(r,g,b);
}

// Bloom
vec4 blur(vec2 uv) {
  float total = 0.;
  float rad = 1.;
  mat2 ang = mat2(.73736882209777832,-.67549037933349609,.67549037933349609,.73736882209777832);
  vec2 point = normalize(fract(cos(uv*mat2(195,174,286,183))*742.)-.5)*(bloom.x/sqrt(SAMPLES));
  vec4 amount = vec4(0);
	
  for ( float i=0.; i<SAMPLES; i++ ) {
    point*=ang;
    rad+=1./rad;
    vec4 samp = texture2D(uMainSampler, uv + point * (rad-1.) * bloomTexel);
    
    float mul = 1.;
    float lum = ( samp.r+samp.g+samp.b )/3.;
    if ( lum < bloom.z ){ mul = 0.; }
    
    amount += samp*(1./rad)*mul;
    total+=(1./rad);
  }
  amount /= total;
  return amount*bloom.y;
}

// TV Curve
vec2 crtCurve( vec2 uv ) {
  uv = uv*2.-1.;
  vec2 uvoff = abs(uv.xy) / crtSize;
  uv = uv + uv * uvoff * uvoff;
  uv = uv * .5 + .5;
  return uv;
}

void main() {	
  vec2 mainUv = outTexCoord;

  // CRT
  if ( crtEnable > .5 ) {
    mainUv = crtCurve(outTexCoord);
  }
	
  // Base coloring
  vec4 color = texture2D( uMainSampler, mainUv);
	
  // Chromatic abberation
  if ( chromaticEnable > .5 ) {
    color.rgb *= chromatic(mainUv, chabIntensity * 0.01);
  }
	
  // Scanlines
  if ( scanlinesEnable > .5 ) {
    color.rgb *= (1.-scanStrength)+(sin(mainUv.y*1024.)*scanStrength);
  }

  // Bloom
  if ( bloomEnable > .5 ) {
    color.rgb += blur(mainUv).rgb;
  }
	
  // Noise
  if ( noiseEnable > .5 ) {
    color.rgb += noise(mainUv)*noiseStrength;
  }
	
  // VHS
  if ( vhsEnable > .5 ) {
    color += vhs(mainUv);
  }
	
  // Vignette
  if ( vignetteEnable > .5) {
    color.rgb *= vig(mainUv);
  }
	
  // Cutoff edges
  if ( crtEnable > .5) {
    if ( (mainUv.x < 0.)|| (mainUv.y < 0.) || (mainUv.x > 1.)|| (mainUv.y > 1.) ) {
      color.rgb *= 0.;
    }
  }
	
  gl_FragColor = color;
}
`;

  var SetEnable = function (enable) {
      if (enable === undefined) {
          enable = true;
      }
      this.bloomEnable = enable;
      this.chromaticEnable = enable;
      this.vignetteEnable = enable;
      this.noiseEnable = enable;
      this.vhsEnable = enable;
      this.scanlinesEnable = enable;
      this.crtEnable = enable;

      return this;
  };

  var BloonConfigurationMethods = {
      setBloomEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.bloomEnable = enable;
          return this;
      },

      setBloomRadius(value) {
          this.bloomRadius = value;
          return this;
      },

      setBloomIntensity(value) {
          this.bloomIntensity = value;
          return this;
      },

      setBloomThreshold(value) {
          this.bloomThreshold = value;
          return this;
      },

      setBloomTexelSize(width, height) {
          if (height === undefined) {
              height = width;
          }
          this.bloomTexelWidth = width;
          this.bloomTexelHeight = height;
          return this;
      }


  };

  var ChromaticConfigurationMethods = {
      setChromaticEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.chromaticEnable = enable;
          return this;
      },

      setChabIntensity(value) {
          this.chabIntensity = value;
          return this;
      },
  };

  var VignetteConfigurationMethod = {
      setVignetteEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.vignetteEnable = enable;
          return this;
      },

      setVignetteStrength(value) {
          this.vignetteStrength = value;
          return this;
      },

      setVignetteIntensity(value) {
          this.vignetteIntensity = value;
          return this;
      }
  };

  var NoiseConfigurationMethod = {
      setNoiseEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.noiseEnable = enable;
          return this;
      },

      setNoiseStrength(value) {
          this.noiseStrength = value;
          return this;
      },

      setNoiseSeed(value) {
          this.noiseSeed = value;
          return this;
      }
  };

  var VHSConfigurationMethod = {
      setVHSEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.vhsEnable = enable;
          return this;
      },

      setVhsStrength(value) {
          this.vhsStrength = value;
          return this;
      },
  };

  var ScanlinesConfigurationMethod = {
      setScanlinesEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.scanlinesEnable = enable;
          return this;
      },

      setScanStrength(value) {
          this.scanStrength = value;
          return this;
      },
  };

  var CRTConfigurationMethod = {
      setCRTEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.crtEnable = enable;
          return this;
      },

      setCrtSize(width, height) {
          if (height === undefined) {
              height = width;
          }
          this.crtWidth = width;
          this.crtHeight = height;
          return this;
      },
  };

  var Methods = {
      setEnable: SetEnable
  };

  Object.assign(
      Methods,
      BloonConfigurationMethods,
      ChromaticConfigurationMethods,
      VignetteConfigurationMethod,
      NoiseConfigurationMethod,
      VHSConfigurationMethod,
      ScanlinesConfigurationMethod,
      CRTConfigurationMethod,
  );

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

  var GetTickDelta = function (game) {
      return GetGame(game).loop.delta;
  };

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;

  class HorrifiPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexHorrifiPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });
          
          this.now = 0;

          // Bloon
          this.bloomEnable = false;
          this.bloomRadius = 0;
          this.bloomIntensity = 0;
          this.bloomThreshold = 0;
          this.bloomTexelWidth = 0;
          this.bloomTexelHeight = 0;

          // Chromatic abberation
          this.chromaticEnable = false;
          this.chabIntensity = 0;

          // Vignette
          this.vignetteEnable = false;
          this.vignetteStrength = 0;
          this.vignetteIntensity = 0;

          // Noise
          this.noiseEnable = false;
          this.noiseStrength = 0;
          this.noiseSeed = Math.random();

          // VHS
          this.vhsEnable = false;
          this.vhsStrength = 0;

          // Scanlines
          this.scanlinesEnable = false;
          this.scanStrength = 0;

          // CRT
          this.crtEnable = false;
          this.crtWidth = 0;
          this.crtHeight = 0;
      }

      resetFromJSON(o) {
          var enable = GetValue(o, 'enable', false);

          // Bloom
          this.setBloomEnable(GetValue(o, 'bloomEnable', enable));
          this.setBloomRadius(GetValue(o, 'bloomRadius', 0));
          this.setBloomIntensity(GetValue(o, 'bloomIntensity', 0));
          this.setBloomThreshold(GetValue(o, 'bloomThreshold', 0));
          this.setBloomTexelSize(GetValue(o, 'bloomTexelWidth', 0), GetValue(o, 'bloomTexelHeight'));

          // Chromatic abberation
          this.setChromaticEnable(GetValue(o, 'chromaticEnable', enable));
          this.setChabIntensity(GetValue(o, 'chabIntensity', 0));

          // Vignette
          this.setVignetteEnable(GetValue(o, 'vignetteEnable', enable));
          this.setVignetteStrength(GetValue(o, 'vignetteStrength', 0));
          this.setVignetteIntensity(GetValue(o, 'vignetteIntensity', 0));

          // Noise
          this.setNoiseEnable(GetValue(o, 'noiseEnable', enable));
          this.setNoiseStrength(GetValue(o, 'noiseStrength', 0));
          this.setNoiseSeed(GetValue(0, 'noiseSeed', Math.random()));

          // VHS
          this.setVHSEnable(GetValue(o, 'vhsEnable', enable));
          this.setVhsStrength(GetValue(o, 'vhsStrength', 0));

          // Scanlines
          this.setScanlinesEnable(GetValue(o, 'scanlinesEnable', enable));
          this.setScanStrength(GetValue(o, 'scanStrength', 0));

          // CRT
          this.setCRTEnable(GetValue(o, 'crtEnable', enable));
          this.setCrtSize(GetValue(o, 'crtWidth', 0), GetValue(o, 'crtHeight', undefined));

          return this;
      }

      onPreRender() {
          this.set1f('noiseSeed', this.noiseSeed);

          // Bloon
          this.set1f('bloomEnable', (this.bloomEnable) ? 1 : 0);
          this.set3f('bloom', this.bloomRadius, this.bloomIntensity, this.bloomThreshold);
          this.set2f('bloomTexel', this.bloomTexelWidth, this.bloomTexelHeight);

          // Chromatic abberation
          this.set1f('chromaticEnable', (this.chromaticEnable) ? 1 : 0);
          this.set1f('chabIntensity', this.chabIntensity);

          // Vignette
          this.set1f('vignetteEnable', (this.vignetteEnable) ? 1 : 0);
          this.set2f('vignette', this.vignetteStrength, this.vignetteIntensity);

          // Noise
          this.set1f('noiseEnable', (this.noiseEnable) ? 1 : 0);
          this.set1f('noiseStrength', this.noiseStrength);

          // VHS
          this.set1f('vhsEnable', (this.vhsEnable) ? 1 : 0);
          this.set1f('vhsStrength', this.vhsStrength);

          // Scanlines
          this.set1f('scanlinesEnable', (this.scanlinesEnable) ? 1 : 0);
          this.set1f('scanStrength', this.scanStrength);

          // CRT        
          this.set1f('crtEnable', (this.crtEnable) ? 1 : 0);
          this.set2f('crtSize', this.crtWidth, this.crtHeight);

          // Eanble by VHS    
          if (this.vhsEnable) {
              this.now += GetTickDelta(this.game);
          }
          this.set1f('time', this.now);
      }
  }

  Object.assign(
      HorrifiPostFxPipeline.prototype,
      Methods
  );

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

  class HorrifiPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(HorrifiPostFxPipeline, 'rexHorrifiPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.HorrifiPostFx', HorrifiPostFxPipeline);

  return HorrifiPipelinePlugin;

}));
