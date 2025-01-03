import { StarIcon } from "@heroicons/react/24/solid";
import { productImgs } from "contains/fakeData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Prices from "./Prices";

export interface CollectionCard2Props {
  id: string | number;
  className?: string;
  imgs?: string[];
  name?: string;
  price?: number;
  description?: string;
}

const CollectionCard2: FC<CollectionCard2Props> = ({
  className,
  imgs,
  name = "Product Name",
  description = "Product Description",
  price,
  id,
}) => {
  return (
    <div className={`CollectionCard2 group relative ${className}`}>
      <div className="relative flex flex-col">
        {imgs[0] && (
          <NcImage
            containerClassName="aspect-w-8 aspect-h-5 bg-neutral-100 rounded-2xl overflow-hidden"
            className="object-contain w-full h-full rounded-2xl"
            src={imgs[0]}
          />
        )}
        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
          {imgs
            .map((img, key) =>
              key == 0
                ? null
                : key < 4
                ? img && (
                    <NcImage
                      key={key}
                      containerClassName="w-full h-24 sm:h-28"
                      className="object-cover w-full h-full rounded-2xl"
                      src={img}
                    />
                  )
                : null
            )
            .filter(Boolean)}
        </div>
      </div>

      <div className="relative mt-5 flex justify-between">
        {/* TITLE */}
        <div className="flex-1">
          <h2 className="font-semibold text-lg sm:text-xl ">{name}</h2>
          {/* AUTHOR */}
          <div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
            <span className="text-sm ">
              <span className="line-clamp-1">{description}</span>
            </span>
          </div>
        </div>
        {price && <Prices className="mt-0.5 sm:mt-1 ml-4" price={price} />}
      </div>
    </div>
  );
};

export default CollectionCard2;
