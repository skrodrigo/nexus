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
		<Html dir="ltr" lang="pt-BR">
			<Tailwind>
				<Head />
				<Body className="bg-white py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] rounded-[8px] border border-zinc-400 bg-zinc-100 p-[32px]">
						<Section>
							<Text className="mt-0 mb-[16px] font-bold text-[24px] text-black">
								Verifique seu endereço de e-mail
							</Text>

							<Text className="mt-0 mb-[24px] text-[16px] text-zinc-600 leading-[24px]">
								Obrigado, {username}, por se inscrever! Para completar seu
								cadastro e proteger sua conta, por favor, verifique seu endereço
								de e-mail clicando no botão abaixo.
							</Text>

							<Section className="mb-[32px] text-center">
								<Button
									className="box-border rounded-[6px] bg-purple-600 px-[32px] py-[12px] font-medium text-[16px] text-white no-underline"
									href={verifyUrl}
								>
									Verificar Endereço de E-mail
								</Button>
							</Section>

							<Text className="mt-0 mb-[24px] text-[14px] text-zinc-600 leading-[20px]">
								Se o botão não funcionar, você pode copiar e colar este link em
								seu navegador:
								<br />
								{verifyUrl}
							</Text>

							<Text className="mt-0 mb-[32px] text-[14px] text-zinc-600 leading-[20px]">
								Este link de verificação expirará em 24 horas. Se você não criou
								uma conta, pode ignorar este e-mail com segurança.
							</Text>

							<Hr className="my-[24px] border-border" />

							<Text className="m-0 text-[12px] text-zinc-600 leading-[16px]">
								Atenciosamente,
								<br />
								Equipe Genesis
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerifyEmail;