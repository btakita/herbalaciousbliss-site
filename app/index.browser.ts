import * as site_header_hyops from '@btakita/ui--browser--herbaliciousbliss/layout'
import { single_hyop } from 'relementjs/browser/hy'
window.addEventListener('load', ()=>{
	single_hyop(document, {
		...site_header_hyops,
	})
})
