/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"

const HOME_AD_SEEN_KEY = "home-ad-seen"
const MEDIA_BASE_URL =
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL ??
    "https://res.cloudinary.com/de5eiayqo/image/upload"
const HOME_AD_IMAGE_URL = `${MEDIA_BASE_URL}/v1774697154/add1_bgl0ly.png`

export default function HomeAdModal() {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const seen = sessionStorage.getItem(HOME_AD_SEEN_KEY)

        if (!seen) {
            setOpen(true)
        }
    }, [])

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)

        if (!nextOpen) {
            sessionStorage.setItem(HOME_AD_SEEN_KEY, "true")
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-150 border-none bg-transparent p-0 shadow-none" showCloseButton={false}>
                <DialogTitle className="sr-only">Quang cao trang chu</DialogTitle>
                <DialogDescription className="sr-only">
                    Hinh anh quang cao hien thi cho nguoi dung o trang chu.
                </DialogDescription>

                <div className="relative rounded-xl overflow-hidden">
                    <img
                        src={HOME_AD_IMAGE_URL}
                        alt="advertisement"
                        className="h-auto w-full object-cover"
                    />

                    <button
                        onClick={() => handleOpenChange(false)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-2"
                    >
                        <X className="w-4 h-4" />
                    </button>

                </div>

            </DialogContent>
        </Dialog>
    )
}



