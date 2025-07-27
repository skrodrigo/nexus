"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
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

const formSchema = z.object({
	email: z.string().email("Email inválido."),
});

export function ForgotPasswordForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { error } = await authClient.forgetPassword({
			email: values.email,
			redirectTo: "/reset-password",
		});

		if (error) {
			toast.error(error.message);
		} else {
			toast.success("Email de redefinição de senha enviado com sucesso!");
		}
	};

	return (
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md bg-card">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Esqueceu sua senha?
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Insira seu e-mail para receber um link de redefinição.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

							<Button
								type="submit"
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<>
										<Loader2 className="mr-2 size-4 animate-spin" />
										Enviando...
									</>
								) : (
									"Enviar link de redefinição"
								)}
							</Button>
						</form>
					</Form>

					<div className="mt-4 text-center text-sm">
						Lembrou sua senha?{" "}
						<Link href="/login" className="text-primary underline">
							Faça login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
