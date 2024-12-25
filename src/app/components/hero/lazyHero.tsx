import React from "react";




const LazyHero = React.lazy(() => import('./hero-1'));

export default LazyHero