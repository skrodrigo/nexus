export interface App {
	icon: React.ReactNode;
	title: string;
	description: string;
	status: 'new' | 'soon' | null;
	actions: {
		label: string;
		href: string;
		variant?: 'default' | 'secondary';
	}[];
}
