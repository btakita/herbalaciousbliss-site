import './index.css'
import { home__doc_html_ } from '@btakita/ui--server--herbaliciousbliss/home'
import { csrf_403_response_, person_, person__wait, session_headers__wait } from '@rappstack/domain--server--auth/auth'
import { login_google__GET, login_google_callback__GET } from '@rappstack/domain--server--auth/google'
import { site_request_ctx__ensure } from '@rappstack/domain--server/ctx'
import { Elysia } from 'elysia'
import { middleware_, rmemo__wait } from 'rebuildjs/server'
import { html_response__new, request_ctx__ensure } from 'relysjs/server'
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
			const headers = await session_headers__wait(ctx)
			await person__wait(ctx)
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
		})
		.get('/login/google', async context=>
			login_google__GET(request_ctx__ensure(middleware_ctx, context)))
		.get('/login/google/callback', async context=>
			login_google_callback__GET(request_ctx__ensure(middleware_ctx, context))))
