import log from '../../plugins/utils/console/bbcodelog/Log.js';

log('[round=5][bgcolor=green]Info[/bgcolor][/round][color=red][bgcolor=blue][size=200%][A][b][i][/bgcolor]Hello[/b][/i][/size] [color=blue]World [/color][size=150%][u][family=american typewriter]AAA[/family]AAA[/u][shadow=red]AAA')


log('[round=5][bgcolor=green]Info[/bgcolor][/round] AAA', 'group')
log('[bgcolor=yellow][color=black]AAA[/color][/bgcolor] BBB')
log('[bgcolor=yellow][color=black]AAA[/color][/bgcolor] BBB')
log(null, 'groupEnd')
