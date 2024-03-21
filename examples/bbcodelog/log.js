import BBCodeLog from '../../plugins/bbcodelog.js';

var log = new BBCodeLog();

log.log('[round=5][bgcolor=green]Info[/bgcolor][/round][color=red][bgcolor=blue][size=200%][A][b][i][/bgcolor]Hello[/b][/i][/size] [color=blue]World [/color][size=150%][u][family=american typewriter]AAA[/family]AAA[/u][shadow=red]AAA')

log.log('[round=5][bgcolor=green]Info[/bgcolor][/round] AAA', 'group')
log.log('[bgcolor=yellow][color=black]AAA[/color][/bgcolor] BBB')
log.log('[bgcolor=yellow][color=black]AAA[/color][/bgcolor] BBB')
log.log(null, 'groupEnd')


var data = [
    { name: 'rex', hp: 10 },
    { name: 'alice', hp: 20 }
]
log.log(data, 'table')

var data = {
    a: 10,
    b: 20
}
log.log(data, 'table')
log.log(data, 'dir')