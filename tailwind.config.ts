import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
const config:Config = {
	content: [],
	theme: {
		fontFamily: {
			sans: ['Urbanist'],
			serif: ['Urbanist'],
		},
		extend: {
			colors: {
				'card-indigo': '#5f5786',
				'card-l0-tl': '#69a84f',
				'card-l0-tr': '#dcebd4',
				'card-l0-br': '#d1e5ca',
				'card-l0-bl': '#0597a4',
				'card-r0-tl': '#3c482c',
				'card-r0-tr': '#3c482c',
				'card-r0-br': '#0597a4',
				'card-r0-bl': '#9fc076',
			}
		}
	},
	plugins: [typography],
}
export default config
