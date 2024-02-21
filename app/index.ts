import { import_meta_env_ } from 'ctx-core/env'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import {
	app_ctx,
	compression_middleware_,
	cwd__set,
	is_prod_,
	port__set,
	src_path__set,
	static_middleware_
} from 'relysjs/server'
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
export function config__init() {
	const port = parseInt(import_meta_env_().HERBALACIOUSBLISS_PORT) || 4102
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	relement__use(server__relement)
}
