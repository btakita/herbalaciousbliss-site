import { type AuthConfig } from '@auth/core'
import GitHub from '@auth/core/providers/github'
import { herbaliciousbliss_server_env_ } from '@btakita/domain--server--herbaliciousbliss/env'
export const auth_config:AuthConfig = {
	// @ts-expect-error Required since accounts.email is nullable (with minimal GitHub scope)
	adapter: modifiedDrizzleAdapter(),
	trustHost: true,
	secret: herbaliciousbliss_server_env_().AUTH_SECRET,
	providers: [
		GitHub({
			clientId: herbaliciousbliss_server_env_().AUTH_GITHUB_ID,
			clientSecret: herbaliciousbliss_server_env_().AUTH_GITHUB_SECRET,
		}),
	],
}
