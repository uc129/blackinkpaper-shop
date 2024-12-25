import EmblaHeroCarousel from "../hero/hero-carousel";

interface ThinBannerSlideProps {
    heading: string;
    text: string;
}
interface ThinBannerProps {
    slides: ThinBannerSlideProps[];
}







export const ThinBanner = (props: ThinBannerProps) => {



    const slides = props.slides.map((slide, index) => (
        <div className="flex items-center justify-center gap-2 text-center w-[440px] mx-auto select-none pointer-events-none">
            <p className="text-sm font-bold uppercase">{slide.heading}</p>
            <p className="text-sm">{slide.text}</p>
        </div>

    ))

    return (
        <div className="thin-banner bg-black text-white p-2 *:text-center">
            <EmblaHeroCarousel slides={slides} />
        </div>
    );


}