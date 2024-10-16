import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour } from "react-icons/fa";

export const navigation = [
  // {
  //   name: "Rearrange Tool",
  //   href: "/dashboard/rearrange",
  //   icon: FaDiceOne,
  // },
  // {
  //   name: "Design and Run Swarm",
  //   href: "/dashboard/design-and-run",
  //   icon: FaDiceOne,
  // },
  // {
  //   name: "Spreadsheet Swarm",
  //   href: "/dashboard/spreadsheet",
  //   icon: FaDiceTwo,
  // },
  {
    name: "Raw LLM",
    href: "/dashboard/raw-llm",
    icon: FaDiceOne,
  },
  {
    name: "No RAG",
    href: "/dashboard/no-rag",
    icon: FaDiceTwo,
  },
  {
    name: "R.A.G. Agent",
    href: "/dashboard/rag-agent",
    icon: FaDiceThree,
  },
];
