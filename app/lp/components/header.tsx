import Image from "next/image";
import Link from "next/link";
import { RiMenuFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

export default function Header() {
	return (
		<div className="flex items-center justify-between py-6">
			<div className="flex items-center gap-8">
				<Image
					src="/nexus.png"
					alt="Logo"
					width={32}
					height={32}
					quality={100}
					className="w-12 h-12"
				/>
				<ul className="hidden gap-4 items-center justify-center md:flex">
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
			<div className="hidden items-center justify-center gap-2 md:flex">
				<Link href="/register">
					<Button variant="outline">Registrar</Button>
				</Link>
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>
			<div className="md:hidden">
				<Drawer>
					<DrawerTrigger>
						<RiMenuFill className="w-6 h-6" />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Menu</DrawerTitle>
						</DrawerHeader>
						<ul className="flex flex-col gap-4 items-start justify-center p-4">
							<li>
								<a href="/" className="hover:text-primary transition-colors">
									Home
								</a>
							</li>
							<li>
								<a
									href="#plans"
									className="hover:text-primary transition-colors"
								>
									Preços
								</a>
							</li>
							<li>
								<a
									href="/blog"
									className="hover:text-primary transition-colors"
								>
									Blog
								</a>
							</li>
						</ul>
						<DrawerFooter className="flex-row gap-2 pt-4">
							<Link href="/register" className="w-full">
								<Button variant="outline" className="w-full">
									Registrar
								</Button>
							</Link>
							<Link href="/login" className="w-full">
								<Button className="w-full">Login</Button>
							</Link>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}
