import './index.css'
import { home__doc_html_ } from '@btakita/ui--server--herbalaciousbliss/home'
import { site_request_ctx__ensure } from '@rappstack/domain--server/ctx'
import { Elysia } from 'elysia'
import { middleware_ } from 'rebuildjs/server'
import { html_response__new } from 'relysjs/server'
import { site, logo_image, social_a1 } from './config.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	})
		.get('/', async context=>
			html_response__new(
				home__doc_html_({
					ctx: site_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				}))))
