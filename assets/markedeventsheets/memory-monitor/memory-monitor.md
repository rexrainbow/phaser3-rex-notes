# Title

## Initial

log.memory

## [If coin > 10]

log\
  text=(coin > 10)

setData
  coin=#(coin-5)

## [Else If (coin > 5) && (coin <=10)]

log\
  text=(coin > 5 and coin <=10)

setData
  coin=#(coin+3)

## [Else]

log\
  text=(coin < 5)

setData
  coin=#(coin+7)
