import RGBToHSV from '../utils/RGBToHSV.js';
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
uniform float hStep;  // 60
uniform float sStep;  // 0.15
uniform float vStep;  // 0.33
`
+ RGBToHSV + Edge + HSVToRGB +
`
void main()
{
  vec4 front = texture2D(uMainSampler, outTexCoord);
  vec3 colorLevel;
  if ((hStep > 0.0) || (sStep > 0.0) || (vStep > 0.0)) {
    vec3 colorHsv = RGBToHSV(front.rgb);  
    if (hStep > 0.0) {
      colorHsv.x = min(ceil(colorHsv.x / hStep) * hStep, 360.0);
    }
    if (sStep > 0.0) {
      colorHsv.y = min(ceil(colorHsv.y / sStep) * sStep, 1.0);
    }
    if (vStep > 0.0) {
      colorHsv.z = min(ceil(colorHsv.z / vStep) * vStep, 1.0);
    }
    colorLevel = HSVToRGB(colorHsv.x, colorHsv.y, colorHsv.z);
  } else {
    colorLevel = front.rgb;
  }

  float edge = Edge(outTexCoord, texSize, edgeGain);
  vec3 blackEdgeColor = vec3(0.0, 0.0, 0.0);
  vec3 outColor = (edge >= edgeThreshold)? blackEdgeColor : colorLevel;

  gl_FragColor = vec4(outColor, front.a);
}
`;

export default frag;