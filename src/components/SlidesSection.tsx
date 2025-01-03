import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import { FC, useEffect, useId, useState } from "react";
import supabase from "services/baseService";
import { offersService } from "services/offersService";
import { DEMO_LARGE_PRODUCTS } from "./SectionSliderLargeProduct2";
export interface SectionSliderLargeProductProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
  shopId;
}

export const getSlides = async (shopId) => {
  try {
    const { data, error } = await supabase
      .from("slides")
      .select("*")
      .eq("shop_id", shopId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const fetchOffers = async (shopId) => {
  try {
    const offers = await offersService.getAllOffers(shopId);

    return offers;
  } catch (error) {
    console.error("Error fetching offers:", error);
    return []; // Or handle the error appropriately
  }
};
export interface OfferWithImages
  extends Omit<(typeof DEMO_LARGE_PRODUCTS)[0], "images"> {
  images: string[];
  description: string;
}
const SectionSliderLargeProduct: FC<SectionSliderLargeProductProps> = ({
  className = "",
  cardStyle = "style2",
  shopId,
}) => {
  const [offers, setOffers] = useState<OfferWithImages[]>([]);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [sliders, setSliders] = useState([
    {
      id: 0,
      name: "",
      images: [],
      created_at: "",
    },
  ]);
  useEffect(() => {
    // @ts-ignoreconst
    const OPTIONS: Glide.Options = {
      startAt: 0,
      perView: 3,
      gap: 32,
      bound: true,
      autoplay: 3000,
      hoverpause: true,
      focusAt: "center",
      type: "carousel",
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.15,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },

        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    const handleLoad = () => {
      slider.mount();
    };

    window.addEventListener("load", handleLoad);
    getSlides(shopId)
      .then((res) => {
        console.log("RESPONSE", res);
        setSliders(res);
        slider.mount(); // Mount here if you haven't already
        slider.update(); // Update after setting offers
      })
      .catch((e) => console.log(":", e));

    return () => {
      slider.destroy();
      window.removeEventListener("load", handleLoad);
    };
  }, [UNIQUE_CLASS]);

  return (
    <>
      <div className={`nc-SectionSliderLargeProduct ${className} my-20`}>
        {sliders.length > 0 &&
          sliders.map((slide) => (
            <div className={`${UNIQUE_CLASS} flow-root`}>
              <Heading isCenter={false} hasNextPrev>
                {slide.name}
              </Heading>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {slide.images.map((img, key) => (
                    <li className={`glide__slide`} key={key}>
                      <img
                        src={img}
                        className="glide__slide"
                        alt={slide.name}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SectionSliderLargeProduct;
