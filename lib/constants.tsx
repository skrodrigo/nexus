import {
	RiChatAiFill,
	RiFileCopyFill,
	RiFileTextFill,
	RiFilterFill,
	RiGiftFill,
	RiImageFill,
	RiMailFill,
	RiPlayFill,
	RiShoppingCartFill,
	RiUserStarFill,
} from "react-icons/ri";
import type { App } from "./types";

export const apps: App[] = [
	{
		icon: <RiImageFill className="size-5" />,
		title: "Gerador de Criativos",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/creative-generator" }],
	},
	{
		icon: <RiPlayFill className="size-5" />,
		title: "VSL Player",
		description:
			"Implemente vídeos de vendas com tecnologia de alta performance, focada em maximizar engajamento, retenção e conversão.",
		status: "new",
		actions: [
			{
				label: "Minhas VSLs",
				href: "/dashboard/apps/vsl-player",
				variant: "secondary",
			},
			{ label: "Criar", href: "/dashboard/apps/vsl-player/new" },
		],
	},
	{
		icon: <RiFilterFill className="size-5" />,
		title: "Funis de Quiz Interativos",
		description:
			"Construa jornadas personalizadas com quizzes dinâmicos, segmentação inteligente e captação de leads altamente qualificados.",
		status: "new",
		actions: [
			{
				label: "Acessar Funis",
				href: "/dashboard/apps/quiz-funnels",
				variant: "secondary",
			},
			{ label: "Criar", href: "/dashboard/apps/quiz-funnels/new" },
		],
	},
	{
		icon: <RiFileTextFill className="size-5" />,
		title: "Páginas de Vendas",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/sales-pages/new" }],
	},
	{
		icon: <RiUserStarFill className="size-5" />,
		title: "Área de Membros",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/membership-area/new" }],
	},
	{
		icon: <RiShoppingCartFill className="size-5" />,
		title: "Checkout Próprio",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "soon",
		actions: [{ label: "Criar", href: "/dashboard/apps/checkout/new" }],
	},
	{
		icon: <RiGiftFill className="size-5" />,
		title: "Gerador de Ofertas",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/offer-generator/new" }],
	},
	{
		icon: <RiFileTextFill className="size-5" />,
		title: "Gerador de Ebooks",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/ebook-generator/new" }],
	},
	{
		icon: <RiFileCopyFill className="size-5" />,
		title: "Clonador de Página",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/page-cloner/new" }],
	},
	{
		icon: <RiFilterFill className="size-5" />,
		title: "Minerador de Ofertas",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "soon",
		actions: [{ label: "Criar", href: "/dashboard/apps/offer-miner/new" }],
	},
	{
		icon: <RiMailFill className="size-5" />,
		title: "Email Marketing",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "soon",
		actions: [{ label: "Criar", href: "/dashboard/apps/email-marketing/new" }],
	},
	{
		icon: <RiChatAiFill className="size-5" />,
		title: "Chat com AI",
		description:
			"Crie páginas de vendas profissionais com estrutura validada que aplica automaticamente estratégias de mercado comprovadas e de alta conversão.",
		status: "new",
		actions: [{ label: "Criar", href: "/dashboard/apps/ai-chat/new" }],
	},
];
