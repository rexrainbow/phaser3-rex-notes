# Example

## Initialize

// Create gameobjects

BG
  id=Background
  key=classroom

TEXTBOX
  id=Dialog
  width=500
  height=120

SPRITE
  id=CharacterA
  key=characters
  name=A
  expression=smile

SPRITE
  id=CharacterB
  key=characters
  name=B
  expression=smile

SPRITE
  id=CharacterC
  key=characters
  name=C
  expression=smile

CHOICE
  id=Choice
  width=500


## Section A

// Manipulate gameobjects

log.disable

log
  text=Test disable

log.enable

log
  text=Start...


Dialog.set
  vpy=0.99
  alpha=0.8

CharacterA.set
  vpx=-0.2

CharacterB.set
  vpx=-0.4

CharacterC.set
  vpx=-0.3

bgm.play
  key=theme0

camera.set
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
  vpx=0.8
  ease=Back
  duration=2000
  wait=false

CharacterB.to
  vpx=0.2
  ease=Back
  duration=2000
  wait=false

CharacterC.to
  vpx=0.5
  ease=Back
  duration=2000
// Wait until tween complete

// Ease all SPRITE game objects excluding CharacterA
// !CharacterA.to
//   alpha=0.5
//   duration=300
// Wait until tween complete

CharacterA.focus

```Dialog.typing, name=Me Me Me, speed=100
Line0...
Line1...
Line2...
Line3...
```
// Wait until typing complete

## Section B

// Test choice and IF-branch

setData
  hp=5
  coin=100


log.memory
  text=Befor choice


Choice.choice
  title=Would you like some...
  resultKey=choiceIndex
  option1=Ice cream
  option2=Burger
  option3=Cola
// Wait until clicking any chioce button

log
  text=Select option[color=red]{{choiceIndex}}[/color]

### [IF choiceIndex == 1]

Dialog.typing
  name=Me Me Me
  text=Not today
  speed=100

setData
  hp=#(hp+3)
  coin=#(coin-10)

### [IF choiceIndex == 2]

Dialog.typing
  name=Me Me Me
  text=Too fat
  speed=100

incData
  hp=5
  coin=-10

### [IF choiceIndex == 3]

Dialog.typing
  name=Me Me Me
  text=Another bottle!
  speed=100

incData
  hp=10
  coin=-20


## Section C

log.memory
  text=After choice

wait
  time=3000
  click
// Wait until 3s or any touch

// SPRITE.set
//  tint=0xffffff

CharacterA.unfocus

se.play
  key=explosion
  wait
// Wait until playing se complete

SPRITE.cross
  expression=dizzy

bgm.cross
  key=theme1

wait
  time=200

Background.cross
  key=road
  mode=irisOut

wait
  time=200

// Ease all SPRITE game objects
SPRITE.to
  vpx=-0.3
// Wait until tween complete

uiLayer.to
  alpha=0
// Wait until ui layer fade-out

bgm.stop

