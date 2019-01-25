import RGBToHSV from '../utils/RGBtoHSV.js';
import HSVToRGB from '../utils/HSVToRGB.js';
import Edge from '../utils/Edge.js';

const frag = `
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
uniform float edgeGain; // 5.5;
uniform float edgeThreshold; // 0.2;
`
+ RGBToHSV + Edge + HSVToRGB +
`
#define HueLevCount 6
float HueLevels[HueLevCount] = float[HueLevCount] (0.0,140.0,160.0,240.0,240.0,360.0);
float nearestHue(float h) {
  for(int i=0; i<HueLevCount-1; i++) {
    if ((h >= HueLevels[i]) && (h <= HueLevels[i+1])) {
      return HueLevels[i+1];
    }
  }
}

#define SatLevCount 7
float SatLevels[SatLevCount] = float[SatLevCount] (0.0,0.15,0.3,0.45,0.6,0.8,1.0);
float nearestSat(float s) {
  for(int i=0; i<SatLevCount-1; i++) {
    if ((s >= SatLevels[i]) && (s <= SatLevels[i+1])) {
      return SatLevels[i+1];
    }
  }
}

#define ValLevCount 4
float ValLevels[ValLevCount] = float[ValLevCount] (0.0,0.3,0.6,1.0);
float nearestVal(float v) {
  for(int i=0; i<ValLevCount-1; i++) {
    if ((v >= ValLevels[i]) && (v <= ValLevels[i+1])) {
      return ValLevels[i+1];
    }
  }
}

void main()
{
  vec4 front = texture2D(uMainSampler, outTexCoord);
  vec3 colorHsv = RGBToHSV(front.rgb);
  colorHsv.x = nearestHue(colorHsv.x);
  colorHsv.y = nearestSat(colorHsv.y);
  colorHsv.z = nearestVal(colorHsv.z);
  float edge = Edge(outTexCoord, texSize, edgeGain);
  vec3 outColor = (edge >= edgeThreshold)? 
    vec3(0.0, 0.0, 0.0) : 
    HSVToRGB(colorHsv.x, colorHsv.y, colorHsv.z);

  gl_FragColor = vec4(outColor, 1);
}
`;

export default frag;