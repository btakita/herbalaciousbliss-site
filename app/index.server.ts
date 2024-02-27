import './index.css'
import { herbaliciousbliss_server_env_ } from '@btakita/domain--server--herbaliciousbliss/env'
import { home__doc_html_ } from '@btakita/ui--server--herbaliciousbliss/home'
import { csrf_403_response_, session_headers_ } from '@rappstack/domain--server--auth/auth'
import { site_request_ctx__ensure } from '@rappstack/domain--server/ctx'
import { redirect_response__new } from '@rappstack/domain--server/response'
import { generateCodeVerifier, generateState, Google, OAuth2RequestError } from 'arctic'
import { I } from 'ctx-core/combinators'
import { Elysia } from 'elysia'
import { parseCookies, serializeCookie } from 'oslo/cookie'
import { middleware_, rmemo__wait } from 'rebuildjs/server'
import { html_response__new, request_, request_url_ } from 'relysjs/server'
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
		})
		.get('/login/google', async context=>{
			const {
				AUTH_GOOGLE_ID,
				AUTH_GOOGLE_SECRET
			} = herbaliciousbliss_server_env_()
			const ctx = site_request_ctx__ensure(middleware_ctx, context, {
				logo_image,
				site,
				social_a1
			})
			const { hostname } = request_url_(ctx)
			const scheme = hostname === 'locahost' ? 'http://' : 'https://'
			const google = new Google(
				AUTH_GOOGLE_ID,
				AUTH_GOOGLE_SECRET,
				scheme + hostname + '/login/google/callback')
			const state = generateState()
			const code_verifier = generateCodeVerifier()
			const url = await google.createAuthorizationURL(state, code_verifier)
			const request = request_(ctx)
			const secure = scheme === 'https://'
			const headers = new Headers()
			headers.append(
				'Set-Cookie',
				serializeCookie('state', state, {
					secure,
					path: '/',
					httpOnly: true,
					maxAge: 60 * 10 // 10 min
				}))
			headers.append(
				'Set-Cookie',
				serializeCookie('code_verifier', code_verifier, {
					secure,
					path: '/',
					httpOnly: true,
					maxAge: 60 * 10 // 10 min
				}))
			return redirect_response__new(302, url.href, { headers })
		})
		.get('/login/google/callback', async context=>{
			const ctx = site_request_ctx__ensure(middleware_ctx, context, {
				logo_image,
				site,
				social_a1
			})
			const {
				AUTH_GOOGLE_ID,
				AUTH_GOOGLE_SECRET
			} = herbaliciousbliss_server_env_()
			const request = request_(ctx)
			const request_url = request_url_(ctx)
			const { hostname } = request_url
			const scheme = hostname === 'locahost' ? 'http://' : 'https://'
			const google = new Google(
				AUTH_GOOGLE_ID,
				AUTH_GOOGLE_SECRET,
				scheme + hostname + '/login/google/callback')
			const code = request_url.searchParams.get('code')
			const state = request_url.searchParams.get('state')
			const cookies = parseCookies(request.headers.get('set-cookie') ?? '')
			const storedState = cookies.get('state')
			const storedCodeVerifier = cookies.get('code_verifier')
			if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
				// 400
				throw new Error('Invalid request')
			}
			try {
				const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier)
			} catch (e) {
				if (e instanceof OAuth2RequestError) {
					const { request, message, description } = e
				}
				throw e
			}
		}))
