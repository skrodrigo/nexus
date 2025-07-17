import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
	return (
		<div className="flex items-center justify-between py-6">
			<div className="flex gap-8">
				<Image src="/nexus.svg" alt="Logo" width={32} height={32} />
				<ul className="flex gap-4 items-center justify-center">
					<li>
						<a href="/" className="hover:text-primary transition-colors">
							Home
						</a>
					</li>
					<li>
						<a href="#plans" className="hover:text-primary transition-colors">
							Preços
						</a>
					</li>
					<li>
						<a href="/blog" className="hover:text-primary transition-colors">
							Blog
						</a>
					</li>
				</ul>
			</div>
			<div className="flex gap-2 items-center justify-center">
				<Link href="/register">
					<Button variant="outline">Registrar</Button>
				</Link>
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>
		</div>
	);
}
