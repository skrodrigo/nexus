"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z
	.object({
		password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

export function ResetPasswordForm() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const token = searchParams.get("token") as string;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { error } = await authClient.resetPassword({
			newPassword: values.password,
			token,
		});

		if (error) {
			toast.error(error.message);
		} else {
			toast.success("Senha redefinida com sucesso!");
			router.push("/login");
		}
	};

	return (
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md bg-card">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Redefinir sua senha
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Crie uma nova senha para sua conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Nova Senha
										</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Sua nova senha"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Confirmar Nova Senha
										</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirme sua nova senha"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<>
										<Loader2 className="mr-2 size-4 animate-spin" />
										Redefinindo...
									</>
								) : (
									"Redefinir Senha"
								)}
							</Button>
						</form>
					</Form>

					<div className="mt-4 text-center text-sm">
						Voltar para o{" "}
						<Link href="/login" className="text-primary underline">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
