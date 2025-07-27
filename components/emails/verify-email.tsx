import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface VerifyEmailProps {
	username: string;
	verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
	const { username, verifyUrl } = props;
	return (
		<Html lang="pt-BR" dir="ltr">
			<Tailwind>
				<Head />
				<Body className="bg-white font-sans py-[40px]">
					<Container className="bg-zinc-100 border border-zinc-400 rounded-[8px] p-[32px] max-w-[600px] mx-auto">
						<Section>
							<Text className="text-[24px] font-bold text-black mb-[16px] mt-0">
								Verifique seu endereço de e-mail
							</Text>

							<Text className="text-[16px] text-zinc-600 mb-[24px] mt-0 leading-[24px]">
								Obrigado, {username}, por se inscrever! Para completar seu
								cadastro e proteger sua conta, por favor, verifique seu endereço
								de e-mail clicando no botão abaixo.
							</Text>

							<Section className="text-center mb-[32px]">
								<Button
									href={verifyUrl}
									className="bg-emerald-400 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
								>
									Verificar Endereço de E-mail
								</Button>
							</Section>

							<Text className="text-[14px] text-zinc-600 mb-[24px] mt-0 leading-[20px]">
								Se o botão não funcionar, você pode copiar e colar este link em
								seu navegador:
								<br />
								{verifyUrl}
							</Text>

							<Text className="text-[14px] text-zinc-600 mb-[32px] mt-0 leading-[20px]">
								Este link de verificação expirará em 24 horas. Se você não criou
								uma conta, pode ignorar este e-mail com segurança.
							</Text>

							<Hr className="border-border my-[24px]" />

							<Text className="text-[12px] text-zinc-600 m-0 leading-[16px]">
								Atenciosamente,
								<br />
								Equipe Nexus
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerifyEmail;
