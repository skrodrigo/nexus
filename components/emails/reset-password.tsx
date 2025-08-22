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
		<Html dir="ltr" lang="pt-BR">
			<Tailwind>
				<Head />
				<Preview>Redefina sua senha - Ação necessária</Preview>
				<Body className="bg-white py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] rounded-[8px] border border-zinc-400 bg-zinc-100 p-[40px] shadow-sm">
						{/* Header */}
						<Section className="mb-[32px] text-center">
							<Heading className="m-0 mb-[8px] font-bold text-[28px] text-black">
								Redefina Sua Senha
							</Heading>
							<Text className="m-0 text-[16px] text-zinc-600">
								Recebemos uma solicitação para redefinir sua senha
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="m-0 mb-[16px] text-[16px] text-zinc-700 leading-[24px]">
								Olá, {username}
							</Text>
							<Text className="m-0 mb-[16px] text-[16px] text-zinc-700 leading-[24px]">
								Recebemos uma solicitação de redefinição de senha para sua conta
								associada a <strong>{userEmail}</strong>.
							</Text>
							<Text className="m-0 mb-[24px] text-[16px] text-zinc-700 leading-[24px]">
								Clique no botão abaixo para criar uma nova senha. Este link
								expirará em 24 horas por motivos de segurança.
							</Text>
						</Section>

						{/* Reset Button */}
						<Section className="mb-[32px] text-center">
							<Button
								className="box-border inline-block rounded-[8px] bg-purple-600 px-[32px] py-[16px] font-semibold text-[16px] text-white no-underline"
								href={resetUrl}
							>
								Redefinir Senha
							</Button>
						</Section>

						{/* Alternative Link */}
						<Section className="mb-[32px]">
							<Text className="m-0 mb-[8px] text-[14px] text-zinc-600 leading-[20px]">
								Se o botão não funcionar, copie e cole este link em seu
								navegador:
							</Text>
							<Link
								className="break-all text-[14px] text-purple-600"
								href={resetUrl}
							>
								{resetUrl}
							</Link>
						</Section>

						{/* Security Notice */}
						<Section className="mb-[32px] rounded-[8px] bg-zinc-50 p-[20px]">
							<Text className="m-0 mb-[8px] font-semibold text-[14px] text-zinc-700 leading-[20px]">
								Aviso de Segurança:
							</Text>
							<Text className="m-0 mb-[8px] text-[14px] text-zinc-600 leading-[20px]">
								• Se você não solicitou esta redefinição de senha, por favor,
								ignore este e-mail
							</Text>
							<Text className="m-0 mb-[8px] text-[14px] text-zinc-600 leading-[20px]">
								• Este link expirará em 24 horas
							</Text>
							<Text className="m-0 text-[14px] text-zinc-600 leading-[20px]">
								• Por segurança, nunca compartilhe este link com ninguém
							</Text>
						</Section>

						{/* Help Section */}
						<Section className="mb-[32px]">
							<Text className="m-0 text-[14px] text-zinc-600 leading-[20px]">
								Precisa de ajuda? Contate nossa equipe de suporte em{" "}
								<Link
									className="text-purple-600"
									href="mailto:suporte@Genesis.com"
								>
									suporte@Genesis.com
								</Link>
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-zinc-200 border-t pt-[24px]">
							<Text className="m-0 mb-[8px] text-[12px] text-zinc-500 leading-[16px]">
								Este e-mail foi enviado para {userEmail}
							</Text>
							<Text className="m-0 mb-[8px] text-[12px] text-zinc-500 leading-[16px]">
								Genesis
							</Text>
							<Text className="m-0 text-[12px] text-zinc-500 leading-[16px]">
								© 2024 Genesis, Ai. Todos os direitos reservados.{" "}
								<Link className="text-purple-600" href="#">
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