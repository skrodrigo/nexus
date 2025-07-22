"use client";

import { useSearchParams } from "next/navigation";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	XAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartData = [
	{ date: "2024-07-15", views: 750 },
	{ date: "2024-07-16", views: 820 },
	{ date: "2024-07-17", views: 980 },
	{ date: "2024-07-18", views: 650 },
	{ date: "2024-07-19", views: 1100 },
	{ date: "2024-07-20", views: 1250 },
	{ date: "2024-07-21", views: 1350 },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	views: {
		label: "Views",
		color: "var(--chart-1)",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
	tablet: {
		label: "Tablet",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

const browserData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const deviceData = [
	{ device: "desktop", visitors: 450, fill: "var(--color-desktop)" },
	{ device: "mobile", visitors: 350, fill: "var(--color-mobile)" },
	{ device: "tablet", visitors: 150, fill: "var(--color-tablet)" },
];

export function AnalyticsPage() {
	useSearchParams();
	return (
		<ScrollArea className="h-full">
			<div className="space-y-4 pr-6">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
					<Card>
						<CardHeader>
							<CardTitle>Visualizações Hoje</CardTitle>
							<CardDescription>Total de visualizações no dia.</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-meidum">1,250</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Visualizações na Semana</CardTitle>
							<CardDescription>
								Total de visualizações nos últimos 7 dias.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-meidum">8,750</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Tempo Médio</CardTitle>
							<CardDescription>Tempo médio de visualização.</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-meidum">2m 30s</p>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Visualizações nos Últimos 7 Dias</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={chartConfig}
							className="min-h-[200px] w-full"
						>
							<BarChart data={chartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="date"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) =>
										new Date(value).toLocaleDateString("pt-BR", {
											day: "2-digit",
											month: "2-digit",
										})
									}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Bar dataKey="views" fill="var(--color-views)" radius={8} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Visualizações por Navegador</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={chartConfig}
								className="min-h-[200px] w-full"
							>
								<PieChart>
									<ChartTooltip
										content={<ChartTooltipContent nameKey="browser" />}
									/>
									<Pie
										data={browserData}
										dataKey="visitors"
										nameKey="browser"
										innerRadius={60}
										strokeWidth={5}
									>
										{browserData.map((entry) => (
											<Cell
												key={entry.browser}
												fill={entry.fill}
												className="stroke-background"
											/>
										))}
									</Pie>
									<ChartLegend
										content={<ChartLegendContent nameKey="browser" />}
									/>
								</PieChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Visualizações por Dispositivo</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={chartConfig}
								className="min-h-[200px] w-full"
							>
								<PieChart>
									<ChartTooltip
										content={<ChartTooltipContent nameKey="device" />}
									/>
									<Pie
										data={deviceData}
										dataKey="visitors"
										nameKey="device"
										innerRadius={60}
										strokeWidth={5}
									>
										{deviceData.map((entry) => (
											<Cell
												key={entry.device}
												fill={entry.fill}
												className="stroke-background"
											/>
										))}
									</Pie>
									<ChartLegend
										content={<ChartLegendContent nameKey="device" />}
									/>
								</PieChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</ScrollArea>
	);
}
