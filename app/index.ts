import { Elysia } from 'elysia'
import { app_ctx, compression_middleware_, is_prod_, static_middleware_ } from 'relysjs/server'
import { config__init } from '../config.js'
export default async ()=>{
	config__init()
	return new Elysia()
		.use(compression_middleware_())
		.use(await static_middleware_(
			is_prod_(app_ctx)
				? {
					headers_: ()=>({
						'Cache-Control': 'max-age=2592000, public'
					})
				}
				: {}))
		.onError(({ error, request })=>{
			console.error(request.url, error.message, error.stack)
		})
}
