# Title

## [repeat 3]

print\
  text=repeat

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