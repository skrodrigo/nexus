"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userSchema } from "./schemas/user-schema";

export const getUserById = async (id: string) => {
	try {
		const currentUser = await prisma.user.findFirst({
			where: { id },
		});

		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}

		return {
			success: true,
			data: currentUser,
			message: "Usuário obtido com sucesso.",
		};

	} catch (_error) {
		return { success: false, error: "Ocorreu um erro ao buscar o usuário." };
	}
};

export const getCurrentUser = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const currentUser = await prisma.user.findFirst({
		where: {
			id: session.user.id,
		},
	});

	if (!currentUser) {
		redirect("/login");
	}

	return {
		...session,
		currentUser,
	};
};

export const getUserByEmail = async (email: string) => {
	try {
		const currentUser = await prisma.user.findFirst({
			where: { email },
		});
		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}
		return {
			success: true,
			data: currentUser,
			message: "Usuário obtido com sucesso.",
		};
	} catch (_error) {
		return { success: false, error: "Ocorreu um erro ao buscar o usuário." };
	}
};

export const getUserSession = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return { success: false, error: "Usuário não autenticado." };
		}

		const currentUser = await prisma.user.findFirst({
			where: {
				id: session?.user?.id,
			},
		});

		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}

		return {
			success: true,
			data: {
				...session,
				user: currentUser,
			},
			message: "Sessão do usuário obtida com sucesso.",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao obter a sessão do usuário.",
		};
	}
};

export const signOut = async () => {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});
		redirect("/login");
	} catch (_error) {
		redirect("/login");
	}
};

export const getUserProfile = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return { success: false, error: "Usuário não autenticado." };
		}

		const userProfile = await prisma.user.findFirst({
			where: {
				id: session?.user?.id,
			},
		});

		if (!userProfile) {
			return { success: false, error: "Perfil do usuário não encontrado." };
		}

		return {
			success: true,
			data: userProfile,
			message: "Perfil do usuário obtido com sucesso.",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar o perfil do usuário.",
		};
	}
};

export const updateProfile = async (data: z.infer<typeof userSchema>) => {
	try {
		const session = await getUserSession();

		if (!(session.success && session.data?.user?.id)) {
			return {
				success: false,
				error: "Usuário não autenticado para atualização.",
			};
		}

		await prisma.user.update({
			where: {
				id: session.data.user.id,
			},
			data,
		});

		return {
			success: true,
			message: "Perfil atualizado com sucesso.",
			redirect: "/chat",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao atualizar o perfil.",
		};
	}
};