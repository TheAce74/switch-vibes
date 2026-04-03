import { cn } from "#/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"rounded-md backdrop-blur-xl",
				"bg-foreground/6",
				"bg-linear-to-r from-transparent via-foreground/10 to-transparent",
				"bg-size-[200%_100%]",
				"animate-[shimmer_5s_linear_infinite]",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
