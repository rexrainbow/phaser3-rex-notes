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

bgm.cross
  key=theme1

角色A.to
  vpx=-0.1

bgm.stop

