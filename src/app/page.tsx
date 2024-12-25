/* eslint-disable*/

'use client'
import { EmblaOptionsType } from "embla-carousel";
import { IProduct } from "./api/products/products.model";
import { ProductCollections } from "./components/product-collections/collections";
import { useStoreContext } from "./lib/data-store/store";
import HeroSection1 from "./components/hero/hero-1";
import { useWindowContext } from "./lib/utils/windowContext";
import { OffersHomeSection } from "./components/offers/offers-home-section";
import Image from "next/image";
import { ThinBanner } from "./components/banners/banner-thin";
import { Schema } from "mongoose";
import { LoadingSimple } from "./components/loading";



const bannerSlides = [
  {
    heading: "End of year sale",
    text: "Ends on 6th January 2025"
  },
  {
    heading: "End of year sale",
    text: "NOW LIVE!"
  },
  {
    heading: "🌲 MERRY CHRISTMAS 🌲",
    text: "🎅🏻 HO! HO! HO! 🎅🏻"
  }
]

export default function Home() {

  const { products, categories } = useStoreContext();
  if (!products) return <LoadingSimple />

  let featuredProducts = products.filter((product: IProduct) => product.isFeatured);
  let companyFeaturedProducts = products.filter((product: IProduct) => product.featuringCompanies?.includes('sylph') || product.featuringCompanies?.includes('sylph-creatives'));
  let companyProductDetails = {
    featuredCompaniesIcons: [
      <Image src='/features/sylph-creatives.png' alt="sam" width={100} height={100} />,
      <Image src='/features/sylph-creatives.png' alt="sam" width={100} height={100} />,
      <Image src='/features/sylph-creatives.png' alt="sam" width={100} height={100} />,
    ],
    products: companyFeaturedProducts,
    collectionTitle: "Featured in"
  }



  let cat1Products = products.filter((product: IProduct) => product.categories.includes('676a71g928011ce853846809' as unknown as Schema.Types.ObjectId));
  let cat2Products = products.filter((product: IProduct) => product.categories.includes('676a71f928011ce853846809' as unknown as Schema.Types.ObjectId));


  const slideOptions: Partial<EmblaOptionsType> = {
    active: true,
    loop: true,
    align: 'center',

  }

  const { isMobile } = useWindowContext()





  return (
    <div>
      <ThinBanner slides={bannerSlides} />

      <section className={` ${isMobile ? 'h-fit' : 'h-fit'} overflow-hidden  bg-gray-100`}>
        <HeroSection1 />
      </section>

      <section>
        <OffersHomeSection />
      </section>

      <section className="px-12">
        <div>
          <ProductCollections collectionTitle="Featured Products" products={featuredProducts} />
        </div>
      </section>

      <section className="px-12">
        <div>
          <ProductCollections {...companyProductDetails} />
        </div>
      </section>


      {cat1Products.length > 0 &&
        <section className="px-12">
          <div>
            <ProductCollections collectionTitle="Category1" products={cat1Products} />
            {/* <p>Category1</p> */}
          </div>
        </section>}


      {cat2Products.length > 0 &&
        <section className="px-12">
          <div>
            <ProductCollections collectionTitle="Category2" products={cat2Products} collectionLink="/categories/676a71f928011ce853846809" />
            {/* <p>Category2</p> */}
          </div>
        </section>}



    </div>
  );
}
