"use client";

import { FormEvent, useState } from "react";
import { useHierarchicalContext } from "@/context/hierarchical-context";
import { Separator } from "@/components/shared/separator";
import { toast } from "react-toastify";
import { errorReporter } from "@/shared/errorReporter";
import { validateFlow } from "@/components/hierarchical/helpers/validate-flow";
import { callSwarmDesigner } from "@/services/callSwarmDesigner";
import { Spinner } from "@/components/shared/common/spinner";

interface P {
  topNavHeight: number;
}

export default function Aside(P: P) {
  const [callSwarmDesignerLoading, setCallSwarmDesignerLoading] =
    useState(false);
  const [swarmDesignerPrompt, setSwarmDesignerPrompt] = useState("");

  const { context, setHierarchicalContext } = useHierarchicalContext();

  const [localData, setLocalData] = useState({
    agents: context.agents || [],
    flow: context.flow || "",
  });

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
    if (context.agents.length > 0) {
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

      // console.log("-__-");
      // console.log(_, agentKey, agentProperty);
      // console.log("-__-");

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
      console.log("handleSubmit");

      validateFlow({
        agents: localData.agents,
        flow: localData.flow,
      });

      console.log("localData", localData);

      setHierarchicalContext(localData);
      toast.success("Swarm customized successfully");
    } catch (error) {
      errorReporter(error, true);
    }
  };

  const handleSwarmDesignerPromptSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();

      setCallSwarmDesignerLoading(true);

      const resp = await callSwarmDesigner(swarmDesignerPrompt);
      setCallSwarmDesignerLoading(false);

      const json = await resp.json();
      const { swarmConfig } = json;

      setLocalData({
        agents: swarmConfig.agents,
        flow: swarmConfig.flow,
      });
      setHierarchicalContext({
        agents: swarmConfig.agents,
        flow: swarmConfig.flow,
      });
    } catch (error) {
      setCallSwarmDesignerLoading(false);
      errorReporter(error, true);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pt-16">
        <div className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl">
          <div className="h-0 flex-1 overflow-y-auto">
            <div className="bg-black px-4 py-6 sm:px-6">
              <form
                onSubmit={handleSwarmDesignerPromptSubmit}
                className="space-y-0"
              >
                <div className="font-semibold text-white">Design Swarm</div>
                <p className="text-sm leading-6 text-blue-300">
                  What are you aiming to accomplish? We&apos;ll generate a group
                  of agents designed to efficiently achieve your goal.
                </p>
                <div>
                  <div className="w-full">
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-gray-300 sm:max-w-md">
                        <textarea
                          rows={5}
                          value={swarmDesignerPrompt}
                          onChange={(e) =>
                            setSwarmDesignerPrompt(e.target.value)
                          }
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
                    type="submit"
                    className="flex w-full justify-center rounded-b-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {callSwarmDesignerLoading ? (
                      <Spinner />
                    ) : (
                      "Run Swarm Builder"
                    )}
                  </button>
                </div>
              </form>
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
                                  {/* Rest of the code */}

                                  <input
                                    id={`agents.${index}.name`}
                                    name={`agents.${index}.name`}
                                    value={
                                      localData?.agents?.[index]?.name || ""
                                    }
                                    onChange={handleChange}
                                    placeholder={`Agent name`}
                                    className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                                  />
                                  <textarea
                                    rows={5}
                                    id={`agents.${index}.system_prompt`}
                                    name={`agents.${index}.system_prompt`}
                                    value={
                                      localData?.agents?.[index]
                                        ?.system_prompt || ""
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
              onClick={() => setLocalData(context)}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={(e) => handleUpdateSwarmConfig()}
              className="ml-4 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Edit Swarm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
