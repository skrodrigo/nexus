import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex items-center justify-center mx-auto gap-2 py-4 border rounded-xl my-2 w-full">
			<Image src="/nexus.png" alt="Logo" width={64} height={64} quality={100} />
			<span className="font-light">© 2025 nexus</span>
		</div>
	);
}
