import { Auth } from '@auth/core'
import { Elysia } from 'elysia'
import { middleware_ } from 'rebuildjs/server'
import { auth_config } from './auth.config.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'auth_routes'
	})
		.get('/*', async (ctx)=>{
			const res = await Auth(ctx.request, auth_config)
			return res
		})
		.post('/*', async (ctx)=>{
			const res = await Auth(ctx.request, auth_config)
			return res
		}))
