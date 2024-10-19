import React, { useEffect, useState } from "react";
import { SwarmDesignerPromptForm } from "./swarm-designer-prompt-form";
import { Separator } from "@radix-ui/react-separator";
import { useSwarmDesignerContext } from "@/context/swarm-designer-context";
import { validateFlow } from "@/components/design-and-run/helpers/validate-flow";
import { errorReporter } from "@/shared/errorReporter";
import { successToast } from "@/shared/toasts";

interface P {
  parent: string;
}

export const CustomizeSwarm = (P: P) => {
  const { context, setSwarmDesignerContext } = useSwarmDesignerContext();

  const [localData, setLocalData] = useState({
    agents: context.agents,
    flow: context.flow,
  });

  useEffect(() => {
    setLocalData(context);
  }, [context]);

  const handleAddAgent = () => {
    if (context.agents.length < 10) {
      setLocalData((prevData) => ({
        ...prevData,
        agents: [
          ...prevData.agents,
          {
            name: "",
            system_prompt: "",
          },
        ],
      }));
    }
  };

  const handleRemoveAgent = () => {
    if (localData.agents.length > 0) {
      console.log(localData.agents.slice(0, -1));

      setLocalData((prevData) => ({
        ...prevData,
        agents: prevData.agents.slice(0, -1),
      }));
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name.startsWith("agents.")) {
      const [_, agentKey, agentProperty] = name.split(".");

      setLocalData((prevData) => ({
        ...prevData,
        agents: [
          ...prevData.agents.slice(0, Number.parseInt(agentKey)),
          {
            ...prevData.agents[agentKey],
            [agentProperty]: value,
          },
          ...prevData.agents.slice(Number.parseInt(agentKey) + 1), // Fix off by one bug
        ],
      }));
    } else {
      setLocalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateSwarmConfig = () => {
    try {
      validateFlow({
        agents: localData.agents,
        flow: localData.flow,
      });
      setSwarmDesignerContext(localData);
      successToast("Swarm customized successfully");
    } catch (error) {
      errorReporter(error, true);
    }
  };

  console.log("customize-swarm.tsx", P.parent);

  return (
    <div className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl">
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="bg-black px-4 py-6 sm:px-6">
          <SwarmDesignerPromptForm
            localData={localData}
            setLocalData={setLocalData}
          />
        </div>
        <div className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl">
          <div className="flex flex-1 flex-col justify-between">
            <div className="divide-y divide-gray-200 px-4 sm:px-6">
              <div className="space-y-6 py-6">
                <div>
                  <div>
                    <label
                      htmlFor="agents"
                      className="block text-sm font-medium leading-6 text-gray-200"
                    >
                      Agents
                    </label>
                    <div className="mt-2">
                      {localData.agents?.map(
                        (
                          _: {
                            agent_name: string;
                            system_prompt: string;
                          },
                          index: number
                        ) => (
                          <div key={index}>
                            <fieldset className="border border-gray-400 p-2 rounded-md">
                              <legend className="text-gray-400 text-sm px-1">
                                Agent {index + 1}
                              </legend>
                              <input
                                id={`agents.${index}.name`}
                                name={`agents.${index}.name`}
                                value={localData?.agents?.[index]?.name || ""}
                                onChange={handleChange}
                                placeholder={`Agent name`}
                                className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                              />
                              <textarea
                                rows={5}
                                id={`agents.${index}.system_prompt`}
                                name={`agents.${index}.system_prompt`}
                                value={
                                  localData?.agents?.[index]?.system_prompt ||
                                  ""
                                }
                                onChange={handleChange}
                                placeholder={`System prompt`}
                                className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                              />
                            </fieldset>
                            <Separator className="my-4 bg-gray-700" />
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex justify-end mt-2">
                      {/* Add Agent button */}
                      <button
                        type="button"
                        className="px-2 py-1 text-sm font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
                        onClick={handleAddAgent}
                      >
                        + Add Agent
                      </button>
                      {/* Remove Agent button */}
                      <button
                        type="button"
                        className="px-2 py-1 ml-2 text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                        onClick={handleRemoveAgent}
                      >
                        - Remove Agent
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="flow-name"
                    className="block text-sm font-medium leading-6 text-gray-200"
                  >
                    Flow
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={5}
                      id="flow"
                      name="flow"
                      value={localData?.flow}
                      onChange={handleChange}
                      placeholder="Agent 1, Agent 2 -> Agent 3 etc..."
                      className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-end px-4 py-4">
        <button
          type="button"
          onClick={() => {
            setSwarmDesignerContext({
              agents: [],
              flow: "",
            });

            setLocalData({
              agents: [],
              flow: "",
            });
          }}
          className="rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => setLocalData(context)}
          className="rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={(e) => handleUpdateSwarmConfig()}
          className="ml-4 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
