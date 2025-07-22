"use client";

import { Suspense } from "react";
import { RiLoader2Fill } from "react-icons/ri";
import VslPlayerPageContent from "./_components/vsl-player-page-content";

export default function VslPlayerPage() {
	return (
		<Suspense
			fallback={
				<div>
					<RiLoader2Fill className="animate-spin text-primary size-5" />
				</div>
			}
		>
			<VslPlayerPageContent />
		</Suspense>
	);
}
