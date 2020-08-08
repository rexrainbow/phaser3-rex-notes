import RGBToHSL from '../utils/RGBToHSL.js';
import HSLToRGB from '../utils/HSLToRGB.js';

const frag = `#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
%MyTexture2D%

// Effect parameters
uniform float hueRotate;
uniform float satAdjust;
uniform float lumAdjust;
`
+ RGBToHSL + HSLToRGB + 
`
void main(void) {
	vec4 front = MyTexture2D(outTexCoord);
	vec3 hsl = RGBToHSL(front.rgb);
	hsl.x -= hueRotate;
	hsl.y *= satAdjust;
	hsl.z += (lumAdjust - 0.5) * front.a;
	vec3 rgb = HSLToRGB(hsl);
	gl_FragColor = vec4(rgb, front.a);
}
`;

export default frag;