"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";
import { ImageUp, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    previewUrl?: string;
    alt: string;
    emptyLabel: string;
    placeholderContent?: ReactNode;
    helperText?: string;
    canReset?: boolean;
    onFileSelect: (file: File | null) => void;
    onReset: () => void;
    frameClassName?: string;
    imageClassName?: string;
    emptyClassName?: string;
};

export default function ImageUploadField({
    previewUrl,
    alt,
    emptyLabel,
    placeholderContent,
    canReset = false,
    onFileSelect,
    onReset,
    frameClassName,
    imageClassName,
    emptyClassName,
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputId = useId();

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "group relative overflow-hidden border border-gray-700 bg-gray-800",
                    frameClassName
                )}
            >
                {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={previewUrl}
                        alt={alt}
                        className={cn("h-full w-full object-cover", imageClassName)}
                    />
                ) : (
                    <div
                        className={cn(
                            "flex h-full items-center justify-center px-3 text-center text-xs text-gray-500",
                            emptyClassName
                        )}
                    >
                        {placeholderContent ?? emptyLabel}
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="flex gap-2 px-3">
                        <Button
                            type="button"
                            size="sm"
                            className="bg-white/12 text-white hover:bg-white/20"
                            onClick={() => inputRef.current?.click()}
                        >
                            <ImageUp className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            disabled={!canReset}
                            className="bg-white/12 text-white hover:bg-white/20 disabled:bg-white/8 disabled:text-white/50"
                            onClick={() => {
                                if (inputRef.current) {
                                    inputRef.current.value = "";
                                }
                                onReset();
                            }}
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <input
                id={inputId}
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
            />
        </div>
    );
}
