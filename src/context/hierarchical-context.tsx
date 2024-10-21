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
      role: "Chief Editor",
      goal: "To oversee the news reporting process and ensure all news articles meet editorial standards.",
      backstory:
        "With years of experience in journalism, the Chief Editor leads the news crew, ensuring accuracy, fairness, and clarity in all reports.",
    },
    workerAgents: [
      {
        role: "Field Reporter",
        goal: "To gather news stories from various locations and provide firsthand accounts.",
        backstory:
          "The Field Reporter is always on the move, capturing the pulse of events as they unfold on the ground.",
      },
      {
        role: "Investigative Journalist",
        goal: "To conduct in-depth research and uncover hidden truths behind major news stories.",
        backstory:
          "With a keen eye for detail, the Investigative Journalist digs deep into stories to reveal the facts that matter.",
      },
      {
        role: "News Analyst",
        goal: "To interpret and analyze news stories to provide context and understanding to the audience.",
        backstory:
          "The News Analyst uses their expertise to break down complex news stories, offering insights and perspectives.",
      },
      {
        role: "Photojournalist",
        goal: "To capture compelling images that complement news stories and provide visual context.",
        backstory:
          "Armed with a camera, the Photojournalist tells stories through powerful imagery that captures the essence of events.",
      },
      {
        role: "Copy Editor",
        goal: "To review and edit news articles for grammar, style, and accuracy before publication.",
        backstory:
          "The Copy Editor ensures that every piece of writing is polished and error-free, maintaining the publication's standards.",
      },
    ],
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
