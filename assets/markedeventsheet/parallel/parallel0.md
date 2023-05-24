# Event sheet 0

parallel

## [Condition]

coin > 5

## Script

set
  coin=3

print
  text=Event 0 start

wait

print
  text=Event 0 progress 0

wait

print
  text=Event 0 progress 1

wait

print
  text=Event 0 complete

## [Catch]

print
  text=str(coin = {{coin}})