"use client";

import { Suspense } from "react";
import VslPlayerPageContent from "./_components/vsl-player-page-content";

export default function VslPlayerPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VslPlayerPageContent />
		</Suspense>
	);
}
