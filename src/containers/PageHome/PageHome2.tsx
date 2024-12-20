import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import SlidesSection from "components/SlidesSection";
import { SPORT_PRODUCTS } from "data/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "services/baseService";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionHero3 from "components/SectionHero/SectionHero3";
import { CategoriesNav } from "./Components/Categories";
import { Category } from "./lib/mock-data";
import { Product } from "components/ProductQuickView";
import SiteHeader from "containers/SiteHeader";

interface Slide {
  id: number;
  name: string;
  images: string[];
  created_at: string;
}

function PageHome2() {
  const { identifier } = useParams(); // Accessing company name if needed
  const [shop, setShop] = useState<{
    id: any;
    mainDescription: string;
    secondaryDescription: string;
    logo: string;
  }>({
    id: null,
    mainDescription: "",
    secondaryDescription: "",
    logo: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchAndSetShop = async () => {
      const { data, error } = await fetchShop(identifier);
      const { main_description, secondary_description, logo } = data;
      if (data) {
        setShop({
          id: data.id,
          mainDescription: main_description,
          secondaryDescription: secondary_description,
          logo,
        }); // Update state with valid data
      } else {
        console.error(error); // Handle error appropriately
        // Optionally set an error state or handle it as needed
      }
      return data;
    };

    const getProducts = async (si) => {
      const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .eq("shop_id", si);

      const { data: productsData } = await supabase
        .from("products")
        .select("*, categories(id)")
        .eq("shop_id", si);

      return { categories, products: productsData };
    };

    fetchAndSetShop().then((shop) => {
      getProducts(shop.id).then((res) => {
        console.log(res);
        setProducts(res.products);
        setCategories(res.categories);
        setIsLoading(false);
      });
    });
  }, [identifier]);

  const fetchShop = async (identifier) => {
    return await supabase
      .from("shops")
      .select("id, logo, main_description, secondary_description")
      .eq("identifier", identifier)
      .single();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center text-center w-full">
        <p>Cargando</p>
      </div>
    );
  }

  return (
    <>
      <SiteHeader logo={shop.logo} />

      <div className="nc-PageHome2 relative overflow-hidden">
        <div className="container px-4">
          {/* SECTION HERO */}
          <SectionHero3 shops={shop} />

          <SlidesSection shopId={shop.id} />

          <SectionSliderLargeProduct shopId={shop.id} />
          <div className="relative py-24">
            <SectionSliderProductCard
              shopId={shop.id}
              data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
              subHeading="New Sports equipment"
            />
          </div>
        </div>

        <div id="Grid">
          <CategoriesNav products={products} categories={categories} />
        </div>
        {/* <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionGridFeatureItems shopId={shop.id} />
      </div> */}
      </div>
    </>
  );
}

export default PageHome2;
