import React, { Dispatch, SetStateAction, useState } from "react";
import { callSwarmDesigner } from "@/services/callSwarmDesigner";
import { Spinner } from "@/components/shared/common/spinner";
import { errorReporter } from "@/shared/errorReporter";
import { useSwarmDesignerContext } from "@/context/swarm-designer-context";

interface P {
  localData: {
    agents: any;
    flow: string;
  };
  setLocalData: Dispatch<
    SetStateAction<{
      agents: any;
      flow: string;
    }>
  >;
}

export const SwarmDesignerPromptForm = (P: P) => {
  const { setSwarmDesignerContext } = useSwarmDesignerContext();
  const [callSwarmDesignerLoading, setCallSwarmDesignerLoading] =
    useState(false);
  const [swarmDesignerPrompt, setSwarmDesignerPrompt] = useState("");

  const handleSwarmDesignerPromptSubmit = async () => {
    try {
      setCallSwarmDesignerLoading(true);

      const resp = await callSwarmDesigner(swarmDesignerPrompt);
      setCallSwarmDesignerLoading(false);

      const json = await resp.json();
      const { swarmConfig } = json;

      console.log("swarmConfig", swarmConfig);

      P.setLocalData({
        agents: swarmConfig.agents,
        flow: swarmConfig.flow,
      });
      setSwarmDesignerContext({
        agents: swarmConfig.agents,
        flow: swarmConfig.flow,
      });
    } catch (error) {
      setCallSwarmDesignerLoading(false);
      errorReporter(error, true);
    }
  };

  return (
    <form className="space-y-0">
      <p className="text-sm leading-6 text-blue-300">
        What are you aiming to accomplish? We&apos;ll generate a group of agents
        designed to efficiently achieve your goal.
      </p>
      <div>
        <div className="w-full">
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-gray-300 sm:max-w-md">
              <textarea
                rows={5}
                value={swarmDesignerPrompt}
                onChange={(e) => setSwarmDesignerPrompt(e.target.value)}
                id="swarm-designer-prompt"
                name="swarm-designer-prompt"
                required={true}
                placeholder="Describe your swarm..."
                className="block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 overflow-auto custom-scrollbar"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleSwarmDesignerPromptSubmit}
          className="flex w-full justify-center rounded-b-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {callSwarmDesignerLoading ? <Spinner /> : "Run Swarm Builder"}
        </button>
      </div>
    </form>
  );
};
