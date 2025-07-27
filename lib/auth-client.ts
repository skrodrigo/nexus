import { stripeClient } from "@better-auth/stripe/client";
import { organizationClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [
		organizationClient(),
		stripeClient({ subscription: true }),
		usernameClient(),
	],
	baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = createAuthClient();
