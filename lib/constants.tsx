import {
	RiChatAiFill,
	RiFileCopyFill,
	RiFilterFill,
	RiImageFill,
	RiMailFill,
	RiPlayFill,
	RiShoppingCartFill,
	RiUserStarFill,
} from "react-icons/ri";
import type { App } from "./types";

export const apps: App[] = [
	{
		icon: <RiPlayFill className="size-5" />,
		title: "VSL Player",
		description:
			"Implemente vídeos de vendas com tecnologia de alta performance, focada em maximizar engajamento, retenção e conversão.",
		status: "new",
		actions: [{ label: "Acessar", href: "/dashboard/apps/vsl-player" }],
	},
	{
		icon: <RiFilterFill className="size-5" />,
		title: "Funis de Quiz Interativos",
		description:
			"Construa jornadas personalizadas com quizzes dinâmicos, segmentação inteligente e captação de leads altamente qualificados.",
		status: "new",
		actions: [{ label: "Acessar", href: "/dashboard/apps/funnels" }],
	},
	{
		icon: <RiUserStarFill className="size-5" />,
		title: "Área de Membros",
		description:
			"Crie e gerencie cursos online, ofereça uma experiência de aprendizado exclusiva e controle o acesso dos seus alunos em um ambiente seguro e profissional.",
		status: "new",
		actions: [{ label: "Acessar", href: "/dashboard/apps/course-area" }],
	},
	{
		icon: <RiShoppingCartFill className="size-5" />,
		title: "Checkout Próprio",
		description:
			"Tenha um checkout de alta conversão, personalizável e seguro, integrado diretamente às suas ofertas e funis de venda.",
		status: "new",
		actions: [{ label: "Acessar", href: "/dashboard/apps/" }],
	},
	{
		icon: <RiFileCopyFill className="size-5" />,
		title: "Clonador de Página",
		description:
			"Replique qualquer página da web em segundos. Capture a estrutura e o design para adaptar e lançar suas próprias versões rapidamente.",
		status: "soon",
		actions: [{ label: "Acessar", href: "/dashboard/apps/" }],
	},
	{
		icon: <RiMailFill className="size-5" />,
		title: "Email Marketing",
		description:
			"Crie, automatize e gerencie campanhas de e-mail marketing para nutrir leads e aumentar o engajamento com sua audiência.",
		status: "soon",
		actions: [{ label: "Acessar", href: "/dashboard/apps/" }],
	},
];
