"use client";

import Image from "next/image";

export default function Banner() {
    return (
        <div className="relative w-full">
            <div className="hidden md:block relative w-full h-[500px] lg:h-[650px] overflow-hidden">
                <Image
                    src="/hiro2.png"
                    alt="Roohani Premium Collection"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
            </div>

            <div className="block md:hidden relative w-full h-[400px] overflow-hidden">
                <Image
                    src="/hiro2.png"
                    alt="Roohani Mobile Banner"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
        </div>
    );
}