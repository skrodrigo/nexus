import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
	username: string;
	resetUrl: string;
	userEmail: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
	const { username, resetUrl, userEmail } = props;

	return (
		<Html lang="pt-BR" dir="ltr">
			<Tailwind>
				<Head />
				<Preview>Redefina sua senha - Ação necessária</Preview>
				<Body className="bg-white font-sans py-[40px]">
					<Container className="bg-zinc-100 border border-zinc-400 rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
						{/* Header */}
						<Section className="text-center mb-[32px]">
							<Heading className="text-[28px] font-bold text-black m-0 mb-[8px]">
								Redefina Sua Senha
							</Heading>
							<Text className="text-[16px] text-zinc-600 m-0">
								Recebemos uma solicitação para redefinir sua senha
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="text-[16px] text-zinc-700 leading-[24px] m-0 mb-[16px]">
								Olá, {username}
							</Text>
							<Text className="text-[16px] text-zinc-700 leading-[24px] m-0 mb-[16px]">
								Recebemos uma solicitação de redefinição de senha para sua conta
								associada a <strong>{userEmail}</strong>.
							</Text>
							<Text className="text-[16px] text-zinc-700 leading-[24px] m-0 mb-[24px]">
								Clique no botão abaixo para criar uma nova senha. Este link
								expirará em 24 horas por motivos de segurança.
							</Text>
						</Section>

						{/* Reset Button */}
						<Section className="text-center mb-[32px]">
							<Button
								href={resetUrl}
								className="bg-emerald-400 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
							>
								Redefinir Senha
							</Button>
						</Section>

						{/* Alternative Link */}
						<Section className="mb-[32px]">
							<Text className="text-[14px] text-zinc-600 leading-[20px] m-0 mb-[8px]">
								Se o botão não funcionar, copie e cole este link em seu
								navegador:
							</Text>
							<Link
								href={resetUrl}
								className="text-emerald-400 text-[14px] break-all"
							>
								{resetUrl}
							</Link>
						</Section>

						{/* Security Notice */}
						<Section className="bg-zinc-50 p-[20px] rounded-[8px] mb-[32px]">
							<Text className="text-[14px] text-zinc-700 leading-[20px] m-0 mb-[8px] font-semibold">
								Aviso de Segurança:
							</Text>
							<Text className="text-[14px] text-zinc-600 leading-[20px] m-0 mb-[8px]">
								• Se você não solicitou esta redefinição de senha, por favor,
								ignore este e-mail
							</Text>
							<Text className="text-[14px] text-zinc-600 leading-[20px] m-0 mb-[8px]">
								• Este link expirará em 24 horas
							</Text>
							<Text className="text-[14px] text-zinc-600 leading-[20px] m-0">
								• Por segurança, nunca compartilhe este link com ninguém
							</Text>
						</Section>

						{/* Help Section */}
						<Section className="mb-[32px]">
							<Text className="text-[14px] text-zinc-600 leading-[20px] m-0">
								Precisa de ajuda? Contate nossa equipe de suporte em{" "}
								<Link
									href="mailto:suporte@nexus.com"
									className="text-emerald-400"
								>
									suporte@nexus.com
								</Link>
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-t border-zinc-200 pt-[24px]">
							<Text className="text-[12px] text-zinc-500 leading-[16px] m-0 mb-[8px]">
								Este e-mail foi enviado para {userEmail}
							</Text>
							<Text className="text-[12px] text-zinc-500 leading-[16px] m-0 mb-[8px]">
								Nexus, Inc., 123 Rua Fictícia, Cidade, Estado 12345
							</Text>
							<Text className="text-[12px] text-zinc-500 leading-[16px] m-0">
								© 2024 Nexus, Inc. Todos os direitos reservados.{" "}
								<Link href="#" className="text-emerald-400">
									Cancelar inscrição
								</Link>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ForgotPasswordEmail;
