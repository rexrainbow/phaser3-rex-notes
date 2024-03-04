# Title

## [Condition]

coin > 5

## [Condition]

hp > 3

## Script

// single comment line

// comment line inside command lines\
print\
 // comment line inside command lines\
 text=Hello

```print
Hello, {{name}}
Line1
Line2
Line3
```

print\
 text=I have {{coin}} coin

set\
  coin=#( coin + 10 )

print\
 text=Now I have {{coin}} coin

## Before if 

print\
  text=Before if

## [If]

coin < 5

### Label A

print\
  text=If (coin < 5)

## [Else]

### Label Else

print\
  text=Else (coin < 5)

## [If]

coin > 10

### Label B

print\
  text=If (coin > 10)

## After If 

print\
  text=After If

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

## After while

print\
  text=After while

## Break label test

print\
  text=Before break-label

[break]

print\
  text=After break-label

## Exit test

print\
  text=Before exit

[exit]

print\
  text=After exit

## Remainder

print\
  text=Here

print\
  text=Here

## [Catch]

print\
  text=Try again
