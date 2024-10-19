"use client";

import React, { createContext, useState, useContext } from "react";

interface IHierarchicalContext {
  context: {
    agents: any;
    flow: string;
  };
  setHierarchicalContext: React.Dispatch<
    React.SetStateAction<{
      agents: any;
      flow: string;
    }>
  >;
}

const HierarchicalContext = createContext<IHierarchicalContext | undefined>(
  undefined
);

export const HierarchicalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<{
    agents: { name: string; system_prompt: string }[];
    flow: string;
  }>({
    agents: [],
    flow: "",
  });

  return (
    <HierarchicalContext.Provider
      value={{ context: data, setHierarchicalContext: setData }}
    >
      {children}
    </HierarchicalContext.Provider>
  );
};

// Custom hook to use the context
export const useHierarchicalContext = () => {
  const context = useContext(HierarchicalContext);

  if (context === undefined) {
    throw new Error("Custom Hook must be used within the relevant Provider");
  }
  return context;
};
