type Props = {
    message?: string;
};

export function FormError({ message }: Props) {
    return (
        <p className={`text-red-500 text-xs mt-1 min-h-4 transition-all ${message ? "opacity-100" : "opacity-0"}`} >
            {message ?? "placeholder"}
        </p>
    );
}