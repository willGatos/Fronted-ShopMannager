import Glide from "@glidejs/glide";
import { Product, PRODUCTS } from "data/data";
import React, { FC, useEffect, useId, useRef, useState } from "react";
import supabase from "../services/baseService";
import ModalQuickView from "./ModalQuickView";
import Prices from "./Prices";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  shopId;
  data?: Product[];
}
async function getCatalogSections(shopId?: number) {
  try {
    const { data, error } = await supabase
      .from("catalog_sections")
      .select(
        `
        id,
        name,
        type_of_view,
        catalog_section_products (
          product_id (
            id,
            name,
            description,
            images,
            standard_price
            )
          )
        )
      `
      )
      .eq("shop_id", shopId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching catalog sections:", error);
    throw error;
  }
}
const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  shopId,
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
}) => {
  const sliderRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [lLoading, setLoading] = useState(false);
  const [productIdForModal, setProductIdForModal] = useState("1");
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  useEffect(() => {
    const fetchCatalogSections = async () => {
      try {
        const fetchedSections = await getCatalogSections(shopId);
        console.log(fetchedSections);
        setSections(fetchedSections);
      } catch (error) {
        console.error("Failed to fetch catalog sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogSections();
    if (!sliderRef.current) {
      return () => {};
    }

    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();

    return () => {
      slider.destroy();
    };
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      {sections.map((section, key) => (
        <div key={key} className="my-10 space-y-4">
          <h3 className=" text-3xl md:text-4xl font-semibold">
            {section.name}
          </h3>
          <div
            className={`
          ${
            section.type_of_view === "Grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
              : "flex overflow-x-auto pb-4 space-x-8"
          }
        `}
          >
            {section.catalog_section_products?.map(({ product_id }, k) => (
              <>
                {" "}
                <div
                  key={k}
                  className={`
              border p-6 rounded-lg shadow-md
              ${
                section.type_of_view === "Grid"
                  ? "w-full"
                  : "w-64 flex-shrink-0"
              }
            `}
                  onClick={() => {
                    setShowModalQuickView(true);
                    setProductIdForModal(product_id.id);
                  }}
                >
                  <img
                    src={product_id.images.length > 0 && product_id.images[0]}
                    alt={product_id.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg mb-2">
                      {product_id.name}
                    </h4>
                    <Prices
                      price={product_id.standard_price}
                      className="text-xl font-bold"
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
      {/* <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <ModalQuickView
        id={productIdForModal}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </div>
  );
};

export default SectionSliderProductCard;
