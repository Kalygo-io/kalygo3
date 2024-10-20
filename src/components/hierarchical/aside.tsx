"use client";

import { CustomizeCrew } from "@/components/hierarchical/shared/customize-crew";

interface P {
  topNavHeight: number;
}

export default function Aside(P: P) {
  console.log("Aside");

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pt-16">
        <CustomizeCrew />
      </div>
    </div>
  );
}
