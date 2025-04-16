(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhorrififilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterHorrifi';

  const frag = `\
#pragma phaserTemplate(shaderName)

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

#pragma phaserTemplate(fragmentHeader)

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

  const MaxPeriod = 60 * 60 * 1000;

  var GetCurrentTime = function (scene, prevTime) {
      var tickDelta = GetTickDelta(scene);
      var currentTime = prevTime + tickDelta;
      if (currentTime >= MaxPeriod) {
          currentTime -= MaxPeriod;
      }

      return currentTime;
  };

  class ToonifyFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('noiseSeed', controller.noiseSeed);

          // Bloon
          programManager.setUniform('bloomEnable', (controller.bloomEnable) ? 1 : 0);
          programManager.setUniform('bloom', [controller.bloomRadius, controller.bloomIntensity, controller.bloomThreshold]);
          programManager.setUniform('bloomTexel', [controller.bloomTexelWidth, controller.bloomTexelHeight]);

          // Chromatic abberation
          programManager.setUniform('chromaticEnable', (controller.chromaticEnable) ? 1 : 0);
          programManager.setUniform('chabIntensity', controller.chabIntensity);

          // Vignette
          programManager.setUniform('vignetteEnable', (controller.vignetteEnable) ? 1 : 0);
          programManager.setUniform('vignette', [controller.vignetteStrength, controller.vignetteIntensity]);

          // Noise
          programManager.setUniform('noiseEnable', (controller.noiseEnable) ? 1 : 0);
          programManager.setUniform('noiseStrength', controller.noiseStrength);

          // VHS
          programManager.setUniform('vhsEnable', (controller.vhsEnable) ? 1 : 0);
          programManager.setUniform('vhsStrength', controller.vhsStrength);

          // Scanlines
          programManager.setUniform('scanlinesEnable', (controller.scanlinesEnable) ? 1 : 0);
          programManager.setUniform('scanStrength', controller.scanStrength);

          // CRT        
          programManager.setUniform('crtEnable', (controller.crtEnable) ? 1 : 0);
          programManager.setUniform('crtSize', [controller.crtWidth, controller.crtHeight]);

          // Eanble by VHS    
          if (controller.vhsEnable) {
              controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
          }
          programManager.setUniform('time', controller.now);
      }
  }

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

  const GetValue = Phaser.Utils.Objects.GetValue;

  class HorrifiController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

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

          this.resetFromJSON(config);
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
  }

  Object.assign(
      HorrifiController.prototype,
      Methods
  );

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

  class HorrifiFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(ToonifyFilter, HorrifiController);

          this.setFilterListMethod(
              'addRexHorrifi',
              function (config) {
                  return this.add(new HorrifiController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.HorrifiFilter', ToonifyFilter);
  SetValue(window, 'RexPlugins.Filters.HorrifiController', HorrifiController);

  return HorrifiFilterPlugin;

}));
