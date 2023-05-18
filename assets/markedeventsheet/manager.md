# Title

## Script

// Create gameobjects

text
  name=對話框
  width=500
  height=120
  vpy=0.8

sprite
  name=角色A
  key=mushroom
  vpx=0


// Manipulate gameobjects

角色A.to
  vpx=0.7
  ease=Back
  duration=2000
// Wait until tween complete


```對話框,speed=100
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

角色A.to
  vpx=-0.1

