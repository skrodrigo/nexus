"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AllowedDomains() {
	useSearchParams();
	const [domains, setDomains] = useState<string[]>([
		"example.com",
		"mydomain.com",
	]);
	const [newDomain, setNewDomain] = useState("");

	const handleAddDomain = () => {
		if (newDomain.trim() && !domains.includes(newDomain.trim())) {
			setDomains([...domains, newDomain.trim()]);
			setNewDomain("");
		}
	};

	const handleRemoveDomain = (domainToRemove: string) => {
		setDomains(domains.filter((domain) => domain !== domainToRemove));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Domínios Permitidos</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 mb-4 max-w-md">
					<Input
						type="text"
						value={newDomain}
						onChange={(e) => setNewDomain(e.target.value)}
						placeholder="exemplo.com"
					/>
					<Button onClick={handleAddDomain}>Adicionar</Button>
				</div>
				<ul className="space-y-2 max-w-md">
					{domains.map((domain) => (
						<li
							key={domain}
							className="flex items-center justify-between p-2 border rounded-md bg-muted/20"
						>
							<span>{domain}</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleRemoveDomain(domain)}
							>
								<RiCloseFill className="text-foreground" />
							</Button>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
