// Place any global data in this file.
import { type logo_image_T } from '@rappstack/domain--server/logo'
import { type site_T } from '@rappstack/domain--server/site'
import { type social_T } from '@rappstack/domain--server/social'
import herbaliciousbliss_logo_webp from '../public/asset/image/herbaliciousbliss-logo.webp'
// You can import this data from anywhere in your site by using the `import` keyword.
export const site:site_T = {
	website: 'https://herbaliciousbliss.com', // replace this with your deployed domain
	author: 'Lyra Star',
	description: 'Find Your Herbal Bliss',
	title: 'Herbalacious Bliss',
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
