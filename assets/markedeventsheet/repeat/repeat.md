# Title

## Initial

set\
  loopCount=3

## [repeat 3]

print\
  text=repeat 3 - 0

## [REPEAT loopCount]

print\
  text=repeat 3 - 1

## Before while

print\
  text=Before while

set\
  loopCount=3

## [While]

loopCount > 0

### do-while

print\
  text=do-while {{loopCount}}

set\
  loopCount=#(loopCount-1)