"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { signIn } from "@/server/user";

const formSchema = z.object({
	email: z.string().email("Email inválido."),
	password: z.string().min(1, "A senha é obrigatória."),
});

export function LoginForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("email", values.email);
		formData.append("password", values.password);

		const result = await signIn(null, formData);

		if (result.errors?.message) {
			form.setError("root.serverError", {
				message: result.errors.message.join(", "),
			});
		} else if (result.redirect) {
			toast.success("Login realizado com sucesso!");
			router.push(result.redirect);
		}
	};

	const signInWithGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md bg-card">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Bem-vindo de volta!
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Faça login para continuar sua jornada no Genesis.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Email</FormLabel>
										<FormControl>
											<Input
												placeholder="seu.email@exemplo.com"
												type="email"
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
												placeholder="Sua senha"
												type="password"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<Link
											className="ml-2 flex justify-end text-primary text-sm underline"
											href="/forgot-password"
										>
											esqueceu sua senha?
										</Link>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.formState.errors.root?.serverError && (
								<p className="font-medium text-destructive text-sm">
									{form.formState.errors.root.serverError.message}
								</p>
							)}

							<Button
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={form.formState.isSubmitting}
								type="submit"
							>
								{form.formState.isSubmitting ? "Entrando..." : "Entrar"}
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
						className="w-full"
						onClick={signInWithGoogle}
						variant="outline"
					>
						<Image
							alt="Google"
							className="mr-2"
							height={16}
							src="https://www.svgrepo.com/show/353817/google-icon.svg"
							width={16}
						/>
						Entrar com Google
					</Button>

					<div className="mt-4 text-center text-sm">
						Não tem uma conta?{" "}
						<Link className="text-primary underline" href="/register">
							Cadastre-se
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}