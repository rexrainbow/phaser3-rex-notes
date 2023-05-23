# Title

## Script

// Create gameobjects

text
  name=對話框
  width=500
  height=120

sprite
  name=角色A
  key=mushroom


// Manipulate gameobjects

對話框
  vpy=0.8

角色A
  vpx=-0.1

bgm.play
  key=theme0

camera
  x=0
  y=200
  rotate=-90
  zoom=2

camera.rotateTo
  rotate=0
  duration=2000
  ease=Cubic

camera.zoomTo
  zoom=1
  duration=2000
  ease=Cubic
  wait

wait
  time=300

camera.scrollTo
  x=0
  y=0
  duration=2000
  ease=Cubic
  wait

camera.shake
  duration=500

camera.flash


角色A.to
  vpx=0.7
  ease=Back
  duration=2000
// Wait until tween complete


```對話框.typing, speed=100
Line0...
Line1...
Line2...
Line3...
```
// Wait until typing complete

wait
  time=3000
  click
// Wait until 3s or any touch

se.play
  key=explosion
  wait
// Wait until playing se complete

bgm.cross
  key=theme1

角色A.to
  vpx=-0.1

wait
  time=2000

bgm.stop

