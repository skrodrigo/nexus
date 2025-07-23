import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import Stripe from "stripe";
import { ac, admin, member, owner } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getActiveOrganization } from "@/server/organizations";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2025-06-30.basil",
});

export const auth = betterAuth({
	plugins: [
		nextCookies(),
		organization({
			ac,
			roles: {
				owner,
				admin,
				member,
			},
		}),
		stripe({
			stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					{
						id: "launch",
						name: "Launch",
						price: 49,
						priceId: "",
						interval: "month",
					},
					{
						id: "scale",
						name: "Scale",
						price: 149,
						priceId: "",
						interval: "month",
					},
				],
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
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	databaseHooks: {
		session: {
			create: {
				before: async (session) => {
					const organization = await getActiveOrganization(session.userId);
					return {
						data: {
							...session,
							activeOrganizationId: organization?.id,
						},
					};
				},
			},
		},
	},

	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});
