import { Spinner } from "@/components/shared/common/spinner";
import { useHierarchicalHaitianNewsCrewContext } from "@/context/hierarchical-haitian-news-crew-context";
import { callCrewDesigner } from "@/services/callCrewDesigner";
import { errorReporter } from "@/shared/errorReporter";
import React, { useState } from "react";

interface P {
  localData: {
    managerAgent: any;
    workerAgents: any;
  };
  setLocalData: React.Dispatch<
    React.SetStateAction<{
      managerAgent: any;
      workerAgents: any;
    }>
  >;
}

export const CrewDesignerPromptForm = (P: P) => {
  const { setHierarchicalContext } = useHierarchicalHaitianNewsCrewContext();
  const [callCrewDesignerLoading, setCallCrewDesignerLoading] = useState(false);
  const [crewDesignerPrompt, setCrewDesignerPrompt] = useState("");

  const handleCrewDesignerPromptSubmit = async () => {
    try {
      setCallCrewDesignerLoading(true);

      const resp = await callCrewDesigner(crewDesignerPrompt);
      setCallCrewDesignerLoading(false);

      const json = await resp.json();
      const { swarmConfig } = json;

      P.setLocalData({
        managerAgent: swarmConfig.managerAgent,
        workerAgents: swarmConfig.workerAgents,
      });
      setHierarchicalContext({
        managerAgent: swarmConfig.managerAgent,
        workerAgents: swarmConfig.workerAgents,
        task: swarmConfig.task,
      });
    } catch (error) {
      setCallCrewDesignerLoading(false);
      errorReporter(error, true);
    }
  };

  return (
    <>
      <form className="space-y-0">
        <p className="text-sm leading-6 text-blue-300">
          What are you aiming to accomplish? We&apos;ll generate a group of
          hierarchical agents designed to efficiently achieve your goal.
        </p>
        <div>
          <div className="w-full">
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-gray-300">
                <textarea
                  rows={4}
                  value={crewDesignerPrompt}
                  onChange={(e) => setCrewDesignerPrompt(e.target.value)}
                  id="swarm-designer-prompt"
                  name="swarm-designer-prompt"
                  required={true}
                  placeholder="Describe your crew..."
                  className="block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 overflow-auto custom-scrollbar"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleCrewDesignerPromptSubmit}
            className="flex w-full justify-center rounded-b-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600"
          >
            {callCrewDesignerLoading ? <Spinner /> : "Run Crew Builder"}
          </button>
        </div>
      </form>
    </>
  );
};
