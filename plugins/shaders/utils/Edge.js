import AvgRGB from './AvgRGB.js';

const frag = 
AvgRGB + 
`
float Edge(vec2 coords, vec2 texSize, float gain) {
  vec2 tc = coords * texSize;
  
  float pixel[9];
  int k = 0;
  float delta;

  // read neighboring pixel intensities
  for (int i=-1; i<2; i++) {
    for(int j=-1; j<2; j++) {
      pixel[k] = AvgRGB( 
        texture2D(
          uMainSampler, 
          (tc + vec2(float(i), float(j))) / texSize 
        ) 
      );     
      k++;
    }
  }

  // average color differences around neighboring pixels
  delta = (abs(pixel[1]-pixel[7])+
           abs(pixel[5]-pixel[3]) +
           abs(pixel[0]-pixel[8])+
           abs(pixel[2]-pixel[6])
           )/4.;

  return clamp(delta*gain, 0.0, 1.0);
}
`;
export default frag;