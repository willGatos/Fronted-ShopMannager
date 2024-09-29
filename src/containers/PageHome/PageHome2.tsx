import { useEffect, useState } from "react";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionPromo1 from "components/SectionPromo1";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import { SPORT_PRODUCTS } from "data/data";

function PageHome2() {
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container px-4">
        {/* SECTION HERO */}
        <SectionHero3 />
        <SectionSliderLargeProduct />
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionSliderProductCard
            data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
            subHeading="New Sports equipment"
          />
        </div>
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* SECTION 
        
        <SectionHowItWork/>
        
        */}
        <SectionGridFeatureItems data={products} />
      </div>
    </div>
  );
}

export default PageHome2;
{
  /* SECTION
        


        */
}

{
  /* <SectionHowItWork /> 
        
         <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        />
        
        */
}

{
  /* SECTION */
}

{
  /* SECTION 
        
        <SectionPromo2 />

        */
}

{
  /* SECTION 3 
        
        <SectionSliderLargeProduct /> 

        */
}

{
  /* SECTION 
        
         
        //import { SPORT_PRODUCTS } from "data/data";
/* import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "components/SectionPromo2"; 
        */
}
