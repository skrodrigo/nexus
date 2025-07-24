import {
	RiDownload2Line,
	RiSearchLine,
	RiUpload2Line,
	RiUserAddLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function AlunosView() {
	return (
		<div className="w-full h-full flex flex-col gap-4 p-4 overflow-auto">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-medium">Alunos</h1>
					<p className="text-muted-foreground">
						Gerencie os alunos matriculados em seus cursos
					</p>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card className="bg-muted">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Limite de Alunos
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-medium">100</div>
						<p className="text-xs text-muted-foreground">
							Você ainda pode adicionar 100 alunos
						</p>
						<Progress value={0} className="mt-2" />
					</CardContent>
				</Card>
				<Card className="bg-muted">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-medium">0</div>
						<p className="text-xs text-muted-foreground">/ 100</p>
					</CardContent>
				</Card>
				<Card className="bg-muted">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Período de Teste
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-medium">100 alunos</div>
						<p className="text-xs text-muted-foreground">
							Expira em 25 de julho
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="relative w-full max-w-sm">
					<RiSearchLine className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Buscar por nome, email ou CPF..."
						className="pl-8"
					/>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<RiUpload2Line className="mr-2" />
						Importar Lista
					</Button>
					<Button variant="outline">
						<RiDownload2Line className="mr-2" />
						Exportar Lista
					</Button>
					<Button>
						<RiUserAddLine className="mr-2" />
						Novo Aluno
					</Button>
				</div>
			</div>

			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nome</TableHead>
							<TableHead>CPF</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Cadastro</TableHead>
							<TableHead>Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={5} className="text-center">
								Nenhum aluno cadastrado
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
