"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server/user";

export async function createOrganization(formData: FormData) {
	try {
		const { currentUser } = await getCurrentUser();
		const name = formData.get("name") as string;

		if (!currentUser || !name) {
			return { success: false, error: "Dados inválidos." };
		}

		if (await prisma.organization.findFirst({ where: { name } })) {
			return { success: false, error: "Organização com este nome já existe." };
		}

		const newOrganization = await auth.api.createOrganization({
			body: {
				name,
				slug: name.toLowerCase().replace(/\s+/g, "-"),
				userId: currentUser.id,
				keepCurrentActiveOrganization: true,
			},
		});

		return {
			success: true,
			data: newOrganization,
			message: "Organização criada com sucesso.",
		};
	} catch (_error) {
		return { success: false, error: "Ocorreu um erro ao criar a organização." };
	}
}

export async function getOrganizations() {
	try {
		const { currentUser } = await getCurrentUser();

		const organizations = await prisma.organization.findMany({
			where: {
				members: {
					some: {
						userId: currentUser.id,
					},
				},
			},
		});

		return { success: true, data: organizations };
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar as organizações.",
		};
	}
}

export async function getActiveOrganization(userId: string) {
	try {
		const memberUser = await prisma.member.findFirst({
			where: { userId },
		});

		if (!memberUser) {
			return {
				success: false,
				error: "Usuário não pertence a uma organização.",
			};
		}

		const activeOrganization = await prisma.organization.findFirst({
			where: { id: memberUser.organizationId },
		});

		if (!activeOrganization) {
			return { success: false, error: "Organização ativa não encontrada." };
		}

		return { success: true, data: activeOrganization };
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar a organização ativa.",
		};
	}
}

export async function getOrganizationBySlug(slug: string) {
	try {
		const organizationBySlug = await prisma.organization.findFirst({
			where: { slug },
			include: {
				members: {
					include: {
						user: true,
					},
				},
			},
		});

		if (!organizationBySlug) {
			return { success: false, error: "Organização não encontrada." };
		}

		return { success: true, data: organizationBySlug };
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar a organização.",
		};
	}
}
