import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
const config:Config = {
	content: [],
	theme: {
		fontFamily: {
			sans: ['Urbanist'],
			serif: ['Urbanist'],
		},
	},
	plugins: [typography],
}
export default config
