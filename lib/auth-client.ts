import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	baseURL: "https://nexus01.vercel.app",
});

export const { signIn, signUp, useSession } = createAuthClient();
