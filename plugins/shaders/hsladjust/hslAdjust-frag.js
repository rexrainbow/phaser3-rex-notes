import RGBToHSL from '../utils/RGBToHSL.js';
import HSLToRGB from '../utils/HSLToRGB.js';

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
+ RGBToHSL + HSLToRGB + 
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
`;

export default frag;