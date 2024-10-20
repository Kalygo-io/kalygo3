"use client";

import React, { createContext, useState, useContext } from "react";

interface ISpreadsheetSwarmContext {
  context: {
    agents: any;
  };
  setSpreadsheetSwarmContext: React.Dispatch<
    React.SetStateAction<{
      agents: any;
    }>
  >;
}

const SpreadsheetSwarmContext = createContext<
  ISpreadsheetSwarmContext | undefined
>(undefined);

export const SpreadsheetSwarmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<{
    agents: { name: string; system_prompt: string }[];
  }>({
    agents: [
      {
        name: "LinkedIn Marketer",
        system_prompt:
          "You are a LinkedIn social media agent. Your task is to create a professional and insightful post related to industry trends or personal achievements. The post should include relevant media such as articles, professional photos, or videos.",
      },
      {
        name: "X.com Marketer",
        system_prompt:
          "You are an X.com social media agent. Your task is to create a post that is short, concise, and uses trending hashtags. The post should be engaging and include relevant media such as images, GIFs, or short videos. The generated content should NOT exceed X's 280 character limit.",
      },
      {
        name: "Instagram Marketer",
        system_prompt:
          "You are an Instagram social media agent. Your task is to create a visually appealing post that includes high-quality images and engaging captions. Consider using stories and reels to maximize reach. The generated content should NOT exceed Instagram's Instagram's 2200 character limit.",
      },
      {
        name: "Facebook Marketer",
        system_prompt:
          "You are a Facebook social media agent. Your task is to create a post that maximizes engagement on Facebook. Use rich media, personal stories, and interactive content. Ensure the post is compelling and includes a call-to-action.",
      },
    ],
  });

  return (
    <SpreadsheetSwarmContext.Provider
      value={{ context: data, setSpreadsheetSwarmContext: setData }}
    >
      {children}
    </SpreadsheetSwarmContext.Provider>
  );
};

// Custom hook to use the context
export const useSpreadsheetSwarmContext = () => {
  const context = useContext(SpreadsheetSwarmContext);

  if (context === undefined) {
    throw new Error("Custom Hook must be used within the relevant Provider");
  }
  return context;
};
