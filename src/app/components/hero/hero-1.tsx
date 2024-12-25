'use client'
/* eslint-disable */

import Image from "next/image"
import { useWindowContext } from "@/app/lib/utils/windowContext"
import EmblaHeroCarousel from "./hero-carousel"




const imageWidth = 1600
let ImageSlides = [
    // <div className="hero-image">
    //     <img src="/art/bg/samurai2.png" alt="hero" width={imageWidth} height={imageWidth} />
    // </div>,

    <div className="hero-image">
        <img src="/art/bg/green.jpg" alt="hero" width={imageWidth} height={imageWidth} />
    </div>,

    <div className="hero-image">
        <img src="/art/bg/mansion.jpg" alt="hero" width={imageWidth} height={imageWidth} />
    </div>,

    <div className="hero-image">
        <img src="/art/bg/green.jpg" alt="hero" width={imageWidth} height={imageWidth} />
    </div>
]

let textSlides = [
    <p className="text-xl lg:text-2xl">
        Artisanal stationery and paper goods.
    </p>,
    <p className="text-xl lg:text-2xl">
        Handmade with love.
    </p>,
    <p className="text-xl lg:text-2xl">
        Made for you.
    </p>,

]


const HeroSection1 = () => {

    const { isMobile } = useWindowContext()

    // grid grid-cols-6 pl-24 py-12 gap-12
    return (
        <div className={`  ${isMobile ? 'grid grid-cols-1 grid-flow-row' : 'grid grid-cols-2'} gap-8 p-4 pl-12`}>


            {/* left */}

            {!isMobile &&
                <div className="left  break-words flex flex-col justify-start mt-32 lg:mt-36 2xl:mt-48">

                    <h1 className={`text-6xl md:text-7xl lg:text-8xl xl:text-[9rem]  2xl:pl-12`}>BLACKINKPAPER</h1>

                    <div className={`flex flex-col gap-4 2xl:pl-4`}>
                        <EmblaHeroCarousel slides={textSlides} interval={12000} />
                        <EmblaHeroCarousel slides={textSlides} interval={16000} />
                    </div>

                </div>}



            {/* right */}
            <div className=" ">
                <EmblaHeroCarousel slides={ImageSlides} />
            </div>

            {isMobile && <div className="left break-words p-4">
                <h1 className={`text-6xl`}>BLACKINKPAPER</h1>
                <div className={`flex flex-col gap-2`}>
                    <EmblaHeroCarousel slides={textSlides} interval={12000} />
                    <EmblaHeroCarousel slides={textSlides} interval={16000} />
                </div>
            </div>}

        </div>

    )


}


export default HeroSection1