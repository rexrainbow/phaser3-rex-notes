# Event sheet 1

## [Condition]

coin > 5

## Script

print
  text=Event 1 start

wait

print
  text=Event 1 progress 0

wait

print
  text=Event 1 progress 1

wait

print
  text=Event 1 complete

## [Else]

print
  template=coin = {{coin}}