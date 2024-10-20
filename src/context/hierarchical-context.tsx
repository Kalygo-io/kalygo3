"use client";

import React, { createContext, useState, useContext } from "react";

interface IHierarchicalContext {
  context: {
    managerAgent: {
      role: string;
      goal: string;
      backstory: string;
    };
    workerAgents: any[];
  };
  setHierarchicalContext: React.Dispatch<
    React.SetStateAction<{
      managerAgent: {
        role: string;
        goal: string;
        backstory: string;
      };
      workerAgents: any[];
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
    managerAgent: {
      role: string;
      goal: string;
      backstory: string;
    };
    workerAgents: { role: string; goal: string; backstory: string }[];
  }>({
    managerAgent: {
      role: "",
      goal: "",
      backstory: "",
    },
    workerAgents: [],
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
