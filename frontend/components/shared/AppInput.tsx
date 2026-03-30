import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Color = "red" | "green" | "blue";

type Props = React.ComponentProps<typeof Input> & {
    color?: Color;
};

const colorVariants: Record<Color, string> = {
    red: "focus-visible:ring-red-500 focus-visible:border-red-500 hover:border-red-500 hover:shadow-red-500/50",
    green: "focus-visible:ring-green-500 focus-visible:border-green-500 hover:border-green-500 hover:shadow-green-500/50",
    blue: "focus-visible:ring-blue-500 focus-visible:border-blue-500 hover:border-blue-500 hover:shadow-blue-500/50"
};

export function AppInput({ color = "red", className, ...props }: Props) {
    return (
        <Input
            {...props}
            className={cn(
                "bg-gray-800 border-gray-700 text-white hover:shadow-lg transition-all",
                colorVariants[color],
                className
            )}
        />
    );
}