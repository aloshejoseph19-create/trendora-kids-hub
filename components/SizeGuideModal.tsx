"use client";

import React, { useState } from "react";
import { X, Ruler, CheckCircle2, Info } from "lucide-react";
import { AgeGroup } from "@/types";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "baby" | "toddler" | "kids";
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  initialTab = "toddler",
}) => {
  const [activeTab, setActiveTab] = useState<"baby" | "toddler" | "kids">(initialTab);
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  const babySizes = [
    { size: "0-3M", heightIn: "19 - 24", heightCm: "48 - 61", weightLbs: "7 - 12", weightKg: "3.2 - 5.5", chestIn: "16", chestCm: "41" },
    { size: "3-6M", heightIn: "24 - 26.5", heightCm: "61 - 67", weightLbs: "12 - 16.5", weightKg: "5.5 - 7.5", chestIn: "17", chestCm: "43" },
    { size: "6-12M", heightIn: "26.5 - 30.5", heightCm: "67 - 77", weightLbs: "16.5 - 24.5", weightKg: "7.5 - 11.1", chestIn: "18", chestCm: "46" },
    { size: "12-18M", heightIn: "30.5 - 32.5", heightCm: "77 - 83", weightLbs: "24.5 - 27.5", weightKg: "11.1 - 12.5", chestIn: "19", chestCm: "48" },
    { size: "18-24M", heightIn: "32.5 - 34", heightCm: "83 - 86", weightLbs: "27.5 - 30", weightKg: "12.5 - 13.6", chestIn: "20", chestCm: "51" },
  ];

  const toddlerSizes = [
    { size: "2T", heightIn: "33 - 36", heightCm: "84 - 91", weightLbs: "28 - 32", weightKg: "12.7 - 14.5", chestIn: "20.5", chestCm: "52" },
    { size: "3T", heightIn: "36 - 39", heightCm: "91 - 99", weightLbs: "32 - 36", weightKg: "14.5 - 16.3", chestIn: "21.5", chestCm: "55" },
    { size: "4T", heightIn: "39 - 42", heightCm: "99 - 107", weightLbs: "36 - 40", weightKg: "16.3 - 18.1", chestIn: "22.5", chestCm: "57" },
  ];

  const kidsSizes = [
    { size: "5-6Y", heightIn: "42 - 47", heightCm: "107 - 119", weightLbs: "40 - 52", weightKg: "18 - 24", chestIn: "24", chestCm: "61" },
    { size: "7-8Y", heightIn: "47 - 52", heightCm: "119 - 132", weightLbs: "52 - 66", weightKg: "24 - 30", chestIn: "26", chestCm: "66" },
    { size: "9-10Y", heightIn: "52 - 57", heightCm: "132 - 145", weightLbs: "66 - 82", weightKg: "30 - 37", chestIn: "28", chestCm: "71" },
  ];

  const currentData =
    activeTab === "baby" ? babySizes : activeTab === "toddler" ? toddlerSizes : kidsSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow/20 text-brand-yellow-hover flex items-center justify-center">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Children&apos;s Sizing Guide
              </h3>
              <p className="text-xs text-slate-500">
                True to size fits with built-in wiggle & growth room.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Unit Controls */}
        <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Age Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("baby")}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "baby"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Baby (0-24M)
            </button>
            <button
              onClick={() => setActiveTab("toddler")}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "toddler"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Toddler (2-4Y)
            </button>
            <button
              onClick={() => setActiveTab("kids")}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "kids"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Kids (5-10Y)
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-semibold">Unit:</span>
            <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => setUnit("in")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  unit === "in"
                    ? "bg-brand-coral text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  unit === "cm"
                    ? "bg-brand-coral text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                CM
              </button>
            </div>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Height ({unit})</th>
                  <th className="py-3 px-4">Weight ({unit === "in" ? "lbs" : "kg"})</th>
                  <th className="py-3 px-4">Chest ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {currentData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                        {row.size}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{unit === "in" ? row.heightIn : row.heightCm}</td>
                    <td className="py-3.5 px-4">{unit === "in" ? row.weightLbs : row.weightKg}</td>
                    <td className="py-3.5 px-4">{unit === "in" ? row.chestIn : row.chestCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Practical Measuring Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-xs text-emerald-900">
                  Pre-Washed & Pre-Shrunk
                </p>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  All our double gauze, French terry, and rib knits are pre-washed at high heat so they will not shrink after washing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-xs text-amber-900">
                  Between Sizes?
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  We always recommend ordering one size up to ensure lasting room to crawl, run, and sprout through the season!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-surface-subtle flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Need custom fitting help? Contact our pediatric stylist.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs transition-colors"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
