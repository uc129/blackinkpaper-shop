import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import './hero-carousel.css'


type PropType = {
    slides: React.ReactNode[]
    options?: EmblaOptionsType
    interval?: number
}

const EmblaHeroCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef] = useEmblaCarousel(options, [Autoplay({ delay: props.interval || 8000 })])

    return (
        <section className="embla_hero -z-0">
            <div className="embla_hero__viewport" ref={emblaRef}>
                <div className="embla_hero__container">
                    {slides.map((slide, index) => (
                        <div className="embla_hero__slide" key={index}>
                            <div className="embla_hero__slide__number">{slide}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaHeroCarousel
