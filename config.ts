// Place any global data in this file.
import {
	bootstrap_substack_,
	fa_facebook_,
	fa_instagram_,
	fa_linkedin_,
	fa_x_twitter_
} from '@btakita/ui--any--herbaliciousbliss/icon'
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
	{
		icon_: bootstrap_substack_,
		link_title: 'Substack',
		href: 'https://lyrastarmist.substack.com/',
		active: true,
	},
	{
		icon_: fa_facebook_,
		link_title: 'Facebook',
		href: 'https://www.facebook.com/HerbaliciousBliss',
		active: true,
	},
	{
		icon_: fa_instagram_,
		link_title: 'Instagram',
		href: 'https://www.instagram.com/lyra_prism/',
		active: true,
	},
	{
		icon_: fa_linkedin_,
		link_title: 'LinkedIn',
		href: 'https://www.linkedin.com/in/lyra-starmist/',
		active: true,
	},
	{
		icon_: fa_x_twitter_,
		link_title: 'X/Twitter',
		href: 'https://twitter.com/SoulSparkLove',
		active: true,
	},
]
export function config__init() {
	const port = parseInt(import_meta_env_().HERBALACIOUSBLISS_PORT) || 4102
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	relement__use(server__relement)
	sqlite_db__name__set(app_ctx, './db/app.db')
}
