"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { signUp } from "@/server/user";

const formSchema = z.object({
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
	email: z.string().email("Email inválido."),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function RegisterForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("password", values.password);

		const result = await signUp(null, formData);

		if (result.errors?.message) {
			form.setError("root.serverError", {
				message: result.errors.message.join(", "),
			});
		} else if (result.redirect) {
			router.push(result.redirect);
		}
	};

	const signInWithGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard/apps",
		});
	};

	return (
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md bg-card">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Crie sua conta no Nexus
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Junte-se à nossa comunidade e explore um novo universo de
						possibilidades.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Nome</FormLabel>
										<FormControl>
											<Input
												placeholder="Seu nome completo"
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="seu.email@exemplo.com"
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Senha</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Crie uma senha forte"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.formState.errors.root?.serverError && (
								<p className="text-sm font-medium text-destructive">
									{form.formState.errors.root.serverError.message}
								</p>
							)}

							<Button
								type="submit"
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting
									? "Criando conta..."
									: "Criar Conta"}
							</Button>
						</form>
					</Form>

					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">
								Ou continue com
							</span>
						</div>
					</div>

					<Button
						variant="outline"
						className="w-full"
						onClick={signInWithGoogle}
					>
						<Image
							src="https://www.svgrepo.com/show/353817/google-icon.svg"
							alt="Google"
							width={16}
							height={16}
							className="mr-2"
						/>
						Cadastrar com Google
					</Button>

					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{" "}
						<Link href="/login" className="text-primary underline">
							Faça login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
