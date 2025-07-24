import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({
	title,
	value,
	change,
	period,
}: {
	title: string;
	value: string;
	change: string;
	period: string;
}) => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-medium">{value}</div>
			<p className="text-xs text-muted-foreground">
				<span
					className={
						change.startsWith("+") ? "text-primary" : "text-destructive"
					}
				>
					{change}
				</span>{" "}
				vs. {period}
			</p>
		</CardContent>
	</Card>
);

const engagementChartData = [
	{ course: "Curso A", engagement: 75 },
	{ course: "Curso B", engagement: 90 },
	{ course: "Curso C", engagement: 50 },
	{ course: "Curso D", engagement: 80 },
];

const completionChartData = [
	{ lesson: "Aula 1", completion: 95, fill: "var(--color-lesson1)" },
	{ lesson: "Aula 2", completion: 80, fill: "var(--color-lesson2)" },
	{ lesson: "Aula 3", completion: 60, fill: "var(--color-lesson3)" },
];

const chartConfig = {
	engagement: {
		label: "Engajamento",
		color: "hsl(var(--chart-1))",
	},
	completion: {
		label: "Conclusão",
	},
	lesson1: {
		label: "Aula 1",
		color: "hsl(var(--chart-1))",
	},
	lesson2: {
		label: "Aula 2",
		color: "hsl(var(--chart-2))",
	},
	lesson3: {
		label: "Aula 3",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export function RelatoriosView() {
	return (
		<div className="w-full h-full flex flex-col gap-4 p-4 overflow-auto">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-medium">Relatórios</h1>
					<p className="text-muted-foreground">
						Acompanhe o desempenho dos seus cursos e alunos
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline">7 dias</Button>
					<Button variant="ghost">30 dias</Button>
					<Button variant="ghost">90 dias</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total de Alunos"
					value="0"
					change="+5%"
					period="período anterior"
				/>
				<StatCard
					title="Progresso Médio"
					value="0.0%"
					change="+4%"
					period="período anterior"
				/>
				<StatCard
					title="Taxa de Engajamento"
					value="0.0%"
					change="+2%"
					period="período anterior"
				/>
				<StatCard
					title="Aulas Concluídas"
					value="0"
					change="+17%"
					period="período anterior"
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="lg:col-span-4">
					<CardHeader>
						<CardTitle>Engajamento por Curso</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<ChartContainer
							config={chartConfig}
							className="min-h-[350px] w-full"
						>
							<BarChart data={engagementChartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="course"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Bar
									dataKey="engagement"
									fill="var(--color-engagement)"
									radius={8}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Top Aulas por Taxa de Conclusão</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={chartConfig}
							className="min-h-[350px] w-full"
						>
							<PieChart>
								<ChartTooltip
									content={<ChartTooltipContent nameKey="lesson" />}
								/>
								<Pie
									data={completionChartData}
									dataKey="completion"
									nameKey="lesson"
									innerRadius={60}
									strokeWidth={5}
								>
									{completionChartData.map((entry) => (
										<Cell
											key={entry.lesson}
											fill={entry.fill}
											className="stroke-background"
										/>
									))}
								</Pie>
								<ChartLegend
									content={<ChartLegendContent nameKey="lesson" />}
								/>
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Estatísticas Detalhadas</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-8 md:grid-cols-3">
					<div className="flex flex-col items-center">
						<span className="text-sm text-muted-foreground">Alunos</span>
						<span className="text-2xl font-medium">0 total / 0 ativos</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-sm text-muted-foreground">Cursos</span>
						<span className="text-2xl font-medium">1 total / 0 publicados</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-sm text-muted-foreground">Aulas</span>
						<span className="text-2xl font-medium">0 total / 0 concluídas</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
