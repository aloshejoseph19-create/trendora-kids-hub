"use client";

import React from "react";
import { Filter, RotateCcw, Check, Sparkles, ChevronDown } from "lucide-react";
import { FilterState, AgeGroup, Category, Gender } from "@/types";
import { AVAILABLE_COLORS, AVAILABLE_SIZES } from "@/data/products";

interface SidebarFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const ageGroupOptions: AgeGroup[] = ["Baby (0-24M)", "Toddler (2-4Y)", "Kids (5-12Y)"];

  const categoryOptions: Category[] = [
    "All",
    "Dresses & Outfits",
    "Toys & Games",
    "Accessories",
    "Everyday Basics",
  ];

  const genderOptions: Gender[] = ["All", "Girls", "Boys", "Gender Neutral"];

  const handleAgeToggle = (age: AgeGroup) => {
    const exists = filters.ageGroups.includes(age);
    const newAges = exists
      ? filters.ageGroups.filter((a) => a !== age)
      : [...filters.ageGroups, age];
    onFilterChange({ ...filters, ageGroups: newAges });
  };

  const handleSizeToggle = (size: string) => {
    const exists = filters.sizes.includes(size);
    const newSizes = exists
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const newColors = exists
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: newColors });
  };

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.gender !== "All" ||
    filters.ageGroups.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[1] < 100 ||
    filters.searchQuery !== "";

  return (
    <aside className="w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-7 sticky top-28">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-slate-800">
            <Filter className="w-4 h-4 text-brand-yellow-hover" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900">Filters</h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Showing {totalFilteredCount} matching items
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-coral hover:text-brand-coral-hover transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* 1. Category Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Categories
        </label>
        <div className="space-y-1.5">
          {categoryOptions.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange({ ...filters, category: cat })}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{cat}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Age Group Toggles (Baby, Toddler, Kids) */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Age Group</span>
          <span className="text-[10px] text-slate-400 font-normal">Select multiple</span>
        </label>
        <div className="space-y-2">
          {ageGroupOptions.map((age) => {
            const isChecked = filters.ageGroups.includes(age);
            return (
              <label
                key={age}
                onClick={() => handleAgeToggle(age)}
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? "bg-brand-yellow/10 border-brand-yellow/60 text-slate-900 font-bold"
                    : "border-slate-200/80 hover:border-slate-300 text-slate-700 font-medium"
                }`}
              >
                <span className="text-xs sm:text-sm">{age}</span>
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                    isChecked
                      ? "bg-brand-yellow border-brand-yellow text-slate-950 font-bold"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Gender Filter */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Collection
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {genderOptions.map((g) => {
            const isSelected = filters.gender === g;
            return (
              <button
                key={g}
                onClick={() => onFilterChange({ ...filters, gender: g })}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  isSelected
                    ? "bg-brand-coral border-brand-coral text-white shadow-2xs"
                    : "bg-white border-slate-200/80 text-slate-700 hover:border-slate-300"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Sizes Toggle Grid */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Sizes
          </label>
          {filters.sizes.length > 0 && (
            <button
              onClick={() => onFilterChange({ ...filters, sizes: [] })}
              className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                    : "bg-surface-subtle border-slate-200/80 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Visual Color Swatches */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Color Swatches
          </label>
          {filters.colors.length > 0 && (
            <button
              onClick={() => onFilterChange({ ...filters, colors: [] })}
              className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_COLORS.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all relative ${
                  isSelected
                    ? "ring-2 ring-slate-900 ring-offset-2 scale-110 shadow-sm"
                    : "hover:scale-105 border border-slate-200"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Filter by ${color.name}`}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      color.name === "Soft Cream" ? "text-slate-900" : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Price Slider Filter */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Max Price
          </label>
          <span className="text-xs font-extrabold text-slate-900">
            ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="15"
          max="100"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)],
            })
          }
          className="w-full accent-brand-coral cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
          <span>$15</span>
          <span>$50</span>
          <span>$100</span>
        </div>
      </div>
    </aside>
  );
};
