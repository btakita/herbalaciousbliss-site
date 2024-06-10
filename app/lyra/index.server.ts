import '../index.css'
import { lyra__doc_html_ } from '@btakita/ui--server--herbaliciousbliss/lyra'
import { csrf_403_response_, person__wait, session_headers__wait } from '@rappstack/domain--server--auth/auth'
import { site_request_ctx__ensure } from '@rappstack/domain--server/ctx'
import { Elysia } from 'elysia'
import { middleware_ } from 'rebuildjs/server'
import { html_response__new } from 'relysjs/server'
import { site } from '../../config.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	})
		.get('/lyra', async context=>{
			const ctx = site_request_ctx__ensure(middleware_ctx, context, { site })
			if (csrf_403_response_(ctx)) {
				return csrf_403_response_(ctx)
			}
			const headers = await session_headers__wait(ctx)
			await person__wait(ctx)
			return html_response__new(
				lyra__doc_html_({
					ctx: site_request_ctx__ensure(
						middleware_ctx,
						context,
						{ site })
				}), { headers })
		}))
