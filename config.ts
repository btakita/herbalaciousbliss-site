// Place any global data in this file.
import { type AuthConfig } from '@auth/core'
import GitHub from '@auth/core/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { herbaliciousbliss_server_env_ } from '@btakita/domain--server--herbaliciousbliss/env'
import { auth_config__set } from '@rappstack/domain--server--auth'
import { drizzle_db_ } from '@rappstack/domain--server/drizzle'
import { type logo_image_T } from '@rappstack/domain--server/logo'
import { type site_T } from '@rappstack/domain--server/site'
import { type social_T } from '@rappstack/domain--server/social'
import { sqlite_db__name__set } from '@rappstack/domain--server/sqlite'
import { import_meta_env_ } from 'ctx-core/env'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { app_ctx, cwd__set, port__set, src_path__set } from 'relysjs/server'
import herbaliciousbliss_logo_webp from '../../public/asset/image/herbaliciousbliss-logo.webp'
// You can import this data from anywhere in your site by using the `import` keyword.
export const site:site_T = {
	website: 'https://herbaliciousbliss.com', // replace this with your deployed domain
	author: 'Lyra Star',
	description: 'Find Your Herbal Bliss',
	title: 'Herbalicious Bliss',
	og_image: herbaliciousbliss_logo_webp,
	light_and_dark_mode: true,
}
export const logo_image:logo_image_T = {
	enable: false,
	svg: true,
	width: 216,
	height: 46,
}
export const social_a1:social_T[] = [
]
export function config__init() {
	const port = parseInt(import_meta_env_().HERBALACIOUSBLISS_PORT) || 4102
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	relement__use(server__relement)
	sqlite_db__name__set(app_ctx, './db/app.db')
	auth_config__set(app_ctx, <AuthConfig>{
		adapter: DrizzleAdapter(drizzle_db_(app_ctx)),
		trustHost: true,
		secret: herbaliciousbliss_server_env_().AUTH_SECRET,
		providers: [
			GitHub({
				clientId: herbaliciousbliss_server_env_().AUTH_GITHUB_ID,
				clientSecret: herbaliciousbliss_server_env_().AUTH_GITHUB_SECRET,
			}),
		],
	})
}
