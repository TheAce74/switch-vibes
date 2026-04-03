import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "#/lib/utils";

function Input({
	className,
	type,
	error,
	...props
}: React.ComponentProps<"input"> & { error?: boolean }) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"h-12 w-full rounded-md bg-bg-input border border-bg-input px-4 py-1 text-sm transition-all outline-none file:inline-flex file:h-9 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
				error &&
					"border-destructive focus-visible:ring-destructive/30 dark:border-destructive/50 dark:focus-visible:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
