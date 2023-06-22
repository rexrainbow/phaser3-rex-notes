# Title

## Script

// Create gameobjects

BG
  name=Background
  key=classroom

TEXT
  name=Dialog
  width=500
  height=120

SPRITE
  name=CharacterA
  key=characters
  frame=A-smile


// Manipulate gameobjects

Dialog
  vpy=0.99
  alpha=0.8

CharacterA
  vpx=-0.2

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


CharacterA.to
  vpx=0.7
  ease=Back
  duration=2000
// Wait until tween complete


```Dialog.typing, who=Me Me Me, speed=100
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

CharacterA.cross
  key=characters
  frame=A-dizzy

bgm.cross
  key=theme1

Background.cross
  key=road

CharacterA.to
  vpx=-0.2
// Wait until tween complete

uiLayer.to
  alpha=0
// Wait until ui layer fade-out

bgm.stop

