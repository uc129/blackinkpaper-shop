import { OffersHomeCard } from "./cards/offer-home-card"





export const OffersHomeSection = () => {




    return (
        <div className="flex flex-wrap p-18 lg:p-24 gap-16 items-center justify-center  ">

            <OffersHomeCard
                title="20% Off All Framed Art"
                description="Framed art prints are ready-to-hang masterpieces that make decorating effortless and elegant. Carefully curated with premium frames, these pieces come fully assembled & ready to hang to instantly transform your walls."
                image_url="/offers/framed-art.png.webp"
            />

            <OffersHomeCard
                title="15% Off All Rolled Art"
                description="Rolled art prints are the perfect choice for art lovers who enjoy flexibility and creativity. These prints arrive unframed and carefully rolled in our tubes, making them easy to ship, store, and frame however you like."
                image_url="/offers/rolled-art.png.webp"
            />


        </div>
    )
}