import './index.css'
import { home__doc_html_ } from '@btakita/ui--server--herbaliciousbliss/home'
import { csrf_403_response_, session_headers_ } from '@rappstack/domain--server--auth/auth'
import { site_request_ctx__ensure } from '@rappstack/domain--server/ctx'
import { I } from 'ctx-core/combinators'
import { Elysia } from 'elysia'
import { middleware_, rmemo__wait } from 'rebuildjs/server'
import { html_response__new } from 'relysjs/server'
import { logo_image, site, social_a1 } from '../config.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	})
		.get('/', async context=>{
			const ctx = site_request_ctx__ensure(middleware_ctx, context, {
				logo_image,
				site,
				social_a1
			})
			if (csrf_403_response_(ctx)) {
				return csrf_403_response_(ctx)
			}
			const headers = await rmemo__wait(
				()=>session_headers_(ctx),
				I)
				.then(headers=>headers!)
			return html_response__new(
				home__doc_html_({
					ctx: site_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				}), { headers })
		}))
