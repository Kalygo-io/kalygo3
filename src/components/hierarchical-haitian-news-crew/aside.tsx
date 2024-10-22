"use client";

import { CustomizeCrew } from "@/components/hierarchical-haitian-news-crew/shared/customize-crew";

interface P {
  topNavHeight: number;
}

export default function Aside(P: P) {
  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pt-16">
        <CustomizeCrew />
      </div>
    </div>
  );
}
