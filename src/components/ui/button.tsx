import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";

const buttonVariants = cva(
	"group/button flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer lg:text-base",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				outline:
					"border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost:
					"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				link: "text-primary underline-offset-4 hover:underline",
				primary:
					"bg-black text-white ring-1 ring-[#B09BD8] !px-6 !py-3 !h-auto transition-all duration-300 ease-out hover:bg-[#111] hover:ring-2 hover:shadow-[0_0_20px_rgba(176,155,216,0.5)] hover:-translate-y-1 focus-visible:bg-[#111] focus-visible:ring-2 focus-visible:ring-[#B09BD8] focus-visible:shadow-[0_0_25px_rgba(176,155,216,0.7)] focus-visible:-translate-y-1 focus-visible:outline-none",
				glow: "bg-black text-white ring-1 ring-[#B09BD8] shadow-[0_0_50px_12px_rgba(204,160,232,0.65)] !px-6 !py-3 !h-auto transition-all duration-500 ease-out hover:bg-[#111] hover:ring-2 hover:shadow-[0_0_80px_20px_rgba(204,160,232,0.95)] hover:-translate-y-1.5 focus-visible:bg-[#111] focus-visible:ring-2 focus-visible:shadow-[0_0_90px_25px_rgba(204,160,232,1)] focus-visible:-translate-y-1.5 focus-visible:outline-none",
				brand:
					"bg-bg-difference-1 ring-1 ring-[#B09BD8] rounded-md !size-12.5 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out hover:bg-white hover:ring-2 hover:shadow-[0_15px_30px_rgba(176,155,216,0.4)] hover:-translate-y-1.5 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#B09BD8] focus-visible:shadow-[0_15px_35px_rgba(176,155,216,0.6)] focus-visible:-translate-y-1.5 focus-visible:outline-none",
			},
			size: {
				default:
					"h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
				lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				icon: "size-9",
				"icon-xs":
					"size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
				"icon-sm":
					"size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonPrimitive.Props,
		VariantProps<typeof buttonVariants> {
	brandLogoUrl?: string;
}

function Button({
	className,
	variant = "default",
	size = "default",
	brandLogoUrl,
	children,
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{variant === "brand" && brandLogoUrl ? (
				<img
					src={brandLogoUrl}
					alt="Brand Token"
					className="size-10 object-contain pointer-events-none"
				/>
			) : null}
			{children}
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
