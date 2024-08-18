(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextoonifypipelineplugin = factory());
})(this, (function () { 'use strict';

  const frag$4 = `\
vec3 RGBToHSV(vec3 color) {
  float minv, maxv, delta;
  vec3 res;
  minv = min(min(color.r, color.g), color.b);
  maxv = max(max(color.r, color.g), color.b);
  res.z = maxv;            // v

  delta = maxv - minv;
  if( maxv != 0.0 ) {
    res.y = delta / maxv;      // s
  } else {
    // s = 0, v is undefined
    res.y = 0.0;
    res.x = -1.0;
    return res;
  }

  if( color.r == maxv ) {
    res.x = ( color.g - color.b ) / delta;      // between yellow & magenta
  } else if( color.g == maxv ) {
    res.x = 2.0 + ( color.b - color.r ) / delta;   // between cyan & yellow
  } else {
    res.x = 4.0 + ( color.r - color.g ) / delta;   // between magenta & cyan
  }

  res.x = res.x * 60.0;            // degrees
  if( res.x < 0.0 ) {
    res.x = res.x + 360.0;
  }
   
  return res;
}
`;

  const frag$3 = `\
vec3 HSVToRGB(float h, float s, float v) {
  int i;
  float f, p, q, t;
  vec3 res;
  if( s == 0.0 ) {
    // achromatic (grey)
    res.x = v;
    res.y = v;
    res.z = v;
    return res;
  }

  h /= 60.0;         // sector 0 to 5
  i = int(floor( h ));
  f = h - float(i);         // factorial part of h
  p = v * ( 1.0 - s );
  q = v * ( 1.0 - s * f );
  t = v * ( 1.0 - s * ( 1.0 - f ) );  
  if (i == 0) {
    res.x = v;
    res.y = t;
    res.z = p;
  } else if (i == 1) {
    res.x = q;
    res.y = v;
    res.z = p;
  } else if (i == 2) {
    res.x = p;
    res.y = v;
    res.z = t;
  } else if (i == 3) {
    res.x = p;
    res.y = q;
    res.z = v;
  } else if (i == 4) {
    res.x = t;
    res.y = p;
    res.z = v;
  } else { // i == 5
    res.x = v;
    res.y = p;
    res.z = q;
  }
  return res;
}
`;

  const frag$2 = `\
float AvgRGB(vec4 color) {
  return (color.r + color.g + color.b)/3.0;
}
`;

  const frag$1 = 
  frag$2 + 
`\
#define EDGEGAIN 5.0
bool IsEdge(vec2 coords, vec2 texSize, float threshold) {
  if (threshold > 1.0) {
    return false;
  }

  vec2 tc = coords * texSize;
  
  float pixel[9];
  int k = 0;
  float delta;

  // read neighboring pixel intensities
  pixel[0] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float(-1))) / texSize )  );
  pixel[1] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 0))) / texSize )  );
  pixel[2] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 1))) / texSize )  );
  pixel[3] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float(-1))) / texSize )  );
  pixel[4] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 0))) / texSize )  );
  pixel[5] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 1))) / texSize )  );
  pixel[6] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float(-1))) / texSize )  );
  pixel[7] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 0))) / texSize )  );
  pixel[8] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 1))) / texSize )  );

  // average color differences around neighboring pixels
  delta = (abs(pixel[1]-pixel[7])+
           abs(pixel[5]-pixel[3]) +
           abs(pixel[0]-pixel[8])+
           abs(pixel[2]-pixel[6])
           )/4.0;

  return (clamp(delta*EDGEGAIN, 0.0, 1.0) >= threshold);
}
`  ;

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
uniform vec2 texSize;

// Effect parameters
uniform float edgeThreshold; // 0.2;
uniform float hStep;  // 60
uniform float sStep;  // 0.15
uniform float vStep;  // 0.33
uniform vec3 edgeColor; // (0, 0, 0);
`
  + frag$4 + frag$1 + frag$3 +
`
void main() {
  vec4 front = texture2D(uMainSampler, outTexCoord);  
  vec3 colorLevel;
  if ((hStep > 0.0) || (sStep > 0.0) || (vStep > 0.0)) {
    vec3 colorHsv = RGBToHSV(front.rgb);  
    if (hStep > 0.0) {
      colorHsv.x = min(floor((colorHsv.x / hStep) + 0.5) * hStep, 360.0);
    }
    if (sStep > 0.0) {
      colorHsv.y = min(floor((colorHsv.y / sStep) + 0.5) * sStep, 1.0);
    }
    if (vStep > 0.0) {
      colorHsv.z = min(floor((colorHsv.z / vStep) + 0.5) * vStep, 1.0);
    }
    colorLevel = HSVToRGB(colorHsv.x, colorHsv.y, colorHsv.z);
  } else {
    colorLevel = front.rgb;
  }

  vec3 outColor = (IsEdge(outTexCoord, texSize, edgeThreshold))? edgeColor : colorLevel;
  gl_FragColor = vec4(outColor, front.a);
}
`  ;

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;
  const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  const Color = Phaser.Display.Color;

  class ToonifyPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexToonifyPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.edgeThreshold = 0;
          this.hueLevels = 0;
          this._satLevels = 0;
          this._valLevels = 0;
          this._edgeColor = new Color();
      }

      resetFromJSON(o) {
          this.setEdgeThreshold(GetValue(o, 'edgeThreshold', 0.2));
          this.setHueLevels(GetValue(o, 'hueLevels', 0));
          this.setSatLevels(GetValue(o, 'satLevels', 0));
          this.setValLevels(GetValue(o, 'valLevels', 0));
          this.setEdgeColor(GetValue(o, 'edgeColor', 0));
          return this;
      }

      onPreRender() {
          this.set1f('edgeThreshold', this.edgeThreshold);
          this.set1f('hStep', this.hueStep);
          this.set1f('sStep', this.satStep);
          this.set1f('vStep', this.valStep);
          this.set3f('edgeColor', this._edgeColor.redGL, this._edgeColor.greenGL, this._edgeColor.blueGL);
          this.set2f('texSize', this.renderer.width, this.renderer.height);
      }

      // edgeThreshold
      setEdgeThreshold(value) {
          this.edgeThreshold = value;
          return this;
      }

      // hueLevels
      setHueLevels(value) {
          this.hueLevels = value;
          return this;
      }

      get hueStep() {
          if (this.hueLevels > 0) {
              return 360 / this.hueLevels;
          } else {
              return 0;
          }
      }

      // satLevels
      get satLevels() {
          return this._satLevels;
      }

      set satLevels(value) {
          this._satLevels = value;
      }

      setSatLevels(value) {
          this.satLevels = value;
          return this;
      }

      get satStep() {
          if (this._satLevels > 0) {
              return 1 / this._satLevels;
          } else {
              return 0;
          }
      }

      // valLevels
      get valLevels() {
          return this._valLevels;
      }

      set valLevels(value) {
          this._valLevels = value;
      }

      setValLevels(value) {
          this.valLevels = value;
          return this;
      }

      get valStep() {
          if (this._valLevels > 0) {
              return 1 / this._valLevels;
          } else {
              return 0;
          }
      }

      // edgeColor
      get edgeColor() {
          return this._edgeColor;
      }

      set edgeColor(value) {
          if (typeof (value) === 'number') {
              value = IntegerToRGB(value);
          }
          this._edgeColor.setFromRGB(value);
      }

      setEdgeColor(value) {
          this.edgeColor = value;
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

  class ToonifyPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(ToonifyPostFxPipeline, 'rexToonifyPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.ToonifyPostFx', ToonifyPostFxPipeline);

  return ToonifyPipelinePlugin;

}));
