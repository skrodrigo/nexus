import { stripeClient } from "@better-auth/stripe/client";
import { organization } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [organization(), stripeClient({ subscription: true })],
	baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = createAuthClient();
