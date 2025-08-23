import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { revalidateChatPath } from '@/server/stripe';
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
// import ResetPasswordEmail from "@/components/emails/reset-password";
// import VerifyEmail from "@/components/emails/verify-email";
import { prisma } from "@/lib/prisma";
// import { resend } from "@/lib/resend";
import { stripeClient } from "@/lib/stripe";

export const auth = betterAuth({
	plugins: [
		nextCookies(),
		stripe({
			stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					{
						name: "Pro",
						priceId: "price_1Ryyph4bKEHHUeu8PhJ5qW8L",
						limits: {
							promptsWeek: 40,
							promptsMonth: 160,
						}
					},
					{
						name: "Advanced",
						priceId: "price_1Rz39v4bKEHHUeu8VK5OuHlB",
						limits: {
							promptsWeek: 160,
							promptsMonth: 640,
						},
					}
				],
				authorizeReference: async ({ user, referenceId }) => {
					return user.id === referenceId;
				},
				getCheckoutSessionParams: () => {
					return {
						params: {
							allow_promotion_codes: true,
						},
					};
				},
			},
		}),
	],

	emailAndPassword: {
		enabled: true,
		// sendResetPassword: async ({ user, url }) => {
		// 	await resend.emails.send({
		// 		from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
		// 		to: user.email,
		// 		subject: "Redefinir sua Senha",
		// 		react: ResetPasswordEmail({
		// 			username: user.name,
		// 			resetUrl: url,
		// 			userEmail: user.email,
		// 		}),
		// 	});
		// },
		requireEmailVerification: true,
	},

	// emailVerification: {
	// 	sendVerificationEmail: async ({ user, url }) => {
	// 		await resend.emails.send({
	// 			from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
	// 			to: user.email,
	// 			subject: "Verifique seu email",
	// 			react: VerifyEmail({ username: user.name, verifyUrl: url }),
	// 		});
	// 	},
	// 	sendOnSignUp: true,
	// 	autoSignInAfterVerification: true,
	// },

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});