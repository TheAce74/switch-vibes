import type { PropsWithChildren } from "react";
import { cn } from "#/lib/utils";

type VibeSectionProps = {
	id: string;
	containerClassName?: string;
	className?: string;
};

export default function VibeSection({
	id,
	children,
	containerClassName,
	className,
}: PropsWithChildren<VibeSectionProps>) {
	return (
		<section id={id} className={cn("w-full bg-bg", containerClassName)}>
			<div
				className={cn(
					"mx-auto w-full max-w-300 px-4 md:px-6 lg:px-8 py-8 lg:py-16",
					className,
				)}
			>
				{children}
			</div>
		</section>
	);
}
