"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	RiArrowRightLine,
	RiMenuFill,
	RiUserSettingsFill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { getUserSession } from "@/server/user";

type Session = Awaited<ReturnType<typeof getUserSession>>;

export default function Header() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		getUserSession().then(setSession);
	}, []);

	return (
		<div className="flex items-center justify-between py-6">
			<div className="flex items-center gap-8">
				<Image
					src="/nexus.png"
					alt="Logo"
					width={64}
					height={64}
					quality={100}
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
				{session?.success ? (
					<>
						<Link href="/suport" className="group">
							<Button variant="outline">
								<span className="group-hover:mr-1 transition-all">
									Falar com Suporte
								</span>
								<RiUserSettingsFill className="size-4 ml-2" />
							</Button>
						</Link>
						<Link href="/dashboard/apps" className="group">
							<Button>
								<span className="group-hover:mr-1 transition-all">
									Dashboard
								</span>
								<RiArrowRightLine className="size-4 ml-2" />
							</Button>
						</Link>
					</>
				) : (
					<>
						<Link href="/register">
							<Button variant="outline">Registrar</Button>
						</Link>
						<Link href="/login">
							<Button>Login</Button>
						</Link>
					</>
				)}
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
						<DrawerFooter className="flex flex-col w-full gap-2">
							{session?.success ? (
								<>
									<Link href="/suport" className="group">
										<Button variant="outline" className="w-full">
											<span className="group-hover:mr-1 transition-all">
												Falar com Suporte
											</span>
											<RiUserSettingsFill className="size-4 ml-2" />
										</Button>
									</Link>
									<Link href="/dashboard/apps" className="group">
										<Button className="w-full">
											<span className="group-hover:mr-1 transition-all">
												Dashboard
											</span>
											<RiArrowRightLine className="size-4 ml-2" />
										</Button>
									</Link>
								</>
							) : (
								<>
									<Link href="/register">
										<Button variant="outline" className="w-full">
											Registrar
										</Button>
									</Link>
									<Link href="/login">
										<Button className="w-full">Login</Button>
									</Link>
								</>
							)}
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}
