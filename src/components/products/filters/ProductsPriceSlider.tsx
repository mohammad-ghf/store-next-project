"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

type ProductsPriceSliderProps = {
  minPrice?: string;
  maxPrice?: string;
  maxAvailablePrice: number;
};

const ProductsPriceSlider = ({
  minPrice,
  maxPrice,
  maxAvailablePrice,
}: ProductsPriceSliderProps) => {
  const initialMin = Math.max(0, Number(minPrice) || 0);
  const initialMax = Math.min(
    maxAvailablePrice,
    maxPrice ? Number(maxPrice) : maxAvailablePrice,
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Math.min(initialMin, initialMax),
    Math.max(initialMin, initialMax),
  ]);

  const handlePriceChange = (value: number | readonly number[]) => {
    if (typeof value === "number") return;

    setPriceRange([value[0] ?? 0, value[1] ?? maxAvailablePrice]);
  };

  const formatPrice = (price: number) => price.toLocaleString("fa-IR");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">از:</span>
        <span className="font-semibold">
          {formatPrice(priceRange[0])} تومان
        </span>
      </div>

      <Slider
        dir="ltr"
        value={priceRange}
        onValueChange={handlePriceChange}
        min={0}
        max={maxAvailablePrice}
        step={100000}
        className="w-full"
      />

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">حداکثر قیمت:</span>
        <span className="font-semibold">
          {formatPrice(priceRange[1])} تومان
        </span>
      </div>

      {/* ارسال مقادیر همراه فرم اصلی */}
      {priceRange[0] > 0 && (
        <input type="hidden" name="minPrice" value={priceRange[0]} />
      )}

      {priceRange[1] < maxAvailablePrice && (
        <input type="hidden" name="maxPrice" value={priceRange[1]} />
      )}
    </div>
  );
};

export default ProductsPriceSlider;
