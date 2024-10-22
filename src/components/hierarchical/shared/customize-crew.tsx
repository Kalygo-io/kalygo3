import { useHierarchicalContext } from "@/context/hierarchical-context";
import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { CrewDesignerPromptForm } from "@/components/hierarchical/shared/crew-designer-prompt-form";
import { errorToast, successToast } from "@/shared/toasts";
import { errorReporter } from "@/shared/errorReporter";

interface P {
  parentTitle?: string;
  setDrawerOpen?: (isOpen: boolean) => void;
}

export const CustomizeCrew = (P: P) => {
  const { context, setHierarchicalContext } = useHierarchicalContext();

  const [localData, setLocalData] = useState({
    managerAgent: context.managerAgent,
    workerAgents: context.workerAgents,
  });

  useEffect(() => {
    setLocalData(context);
  }, [context]);

  const handleAddAgent = () => {
    if (context.workerAgents.length < 10) {
      setLocalData((prevData) => ({
        ...prevData,
        workerAgents: [
          ...prevData.workerAgents,
          {
            role: "",
            goal: "",
            expanded: true,
          },
        ],
      }));
    }
  };

  const handleChangeManager = (e: { target: { name: any; value: any } }) => {
    console.log("handleChangeManager");
    const { name, value } = e.target;

    if (name.startsWith("manager-agent.")) {
      const [_, agentProperty] = name.split(".");

      setLocalData((prevData) => ({
        ...prevData,
        managerAgent: {
          ...prevData.managerAgent,
          [agentProperty]: value,
        },
      }));
    } else {
      errorToast("Invalid manager property");
    }
  };

  const handleChangeWorkers = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name.startsWith("worker-agent.")) {
      const [_, agentKey, agentProperty] = name.split(".");

      setLocalData((prevData) => ({
        ...prevData,
        workerAgents: [
          ...prevData.workerAgents.slice(0, Number.parseInt(agentKey)),
          {
            ...prevData.workerAgents[agentKey],
            [agentProperty]: value,
          },
          ...prevData.workerAgents.slice(Number.parseInt(agentKey) + 1), // Fix off by one bug
        ],
      }));
    } else {
      errorToast("Invalid worker property");
    }
  };

  const handleUpdateCrewConfig = () => {
    try {
      // validateFlow({
      //   agents: localData.agents,
      //   flow: localData.flow,
      // });
      setHierarchicalContext(localData);
      successToast("Crew customized successfully");
    } catch (error) {
      errorReporter(error, true);
    }
  };

  return (
    <div className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl">
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="bg-black px-4 py-6 sm:px-6 space-y-1">
          <div className="flex items-center justify-between font-semibold text-white w-full">
            <span>Design Crew {P.parentTitle}</span>
            <button
              type="button"
              onClick={() => {
                P.setDrawerOpen && P.setDrawerOpen(false);
              }}
              className="xl:hidden relative rounded-md bg-blue-700 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <CrewDesignerPromptForm
            localData={localData}
            setLocalData={setLocalData}
          />
        </div>
        <div className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl">
          <div className="flex flex-1 flex-col justify-between">
            <div className="divide-y divide-gray-200 px-4 sm:px-6">
              <div className="space-y-6 py-6">
                <div>
                  <label
                    htmlFor="manager-agent"
                    className="block text-sm font-medium leading-6 text-gray-200"
                  >
                    Manager Agent
                  </label>
                  <div className="mt-2">
                    <fieldset className="border border-yellow-400 p-2 rounded-md">
                      <input
                        id={`manager-agent.role`}
                        name={`manager-agent.role`}
                        value={localData?.managerAgent?.role || ""}
                        onChange={handleChangeManager}
                        placeholder={`Role`}
                        className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-0"
                      />
                      <textarea
                        rows={2}
                        id={`manager-agent.goal`}
                        name={`manager-agent.goal`}
                        value={localData?.managerAgent?.goal || ""}
                        onChange={handleChangeManager}
                        placeholder={`Goal`}
                        className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                      />
                      <textarea
                        rows={4}
                        id={`manager-agent.backstory`}
                        name={`manager-agent.backstory`}
                        value={localData?.managerAgent?.backstory || ""}
                        onChange={handleChangeManager}
                        placeholder={`Backstory`}
                        className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                      />
                    </fieldset>
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor="worker-agents"
                      className="block text-sm font-medium leading-6 text-gray-200"
                    >
                      Worker Agents
                    </label>
                    <div className="mt-2">
                      {localData.workerAgents?.map(
                        (
                          _: {
                            role: string;
                            goal: string;
                          },
                          index: number
                        ) => (
                          <div key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedAgents =
                                  localData.workerAgents.map((agent, i) =>
                                    i === index
                                      ? { ...agent, expanded: !agent.expanded }
                                      : agent
                                  );
                                setLocalData((prevData) => ({
                                  ...prevData,
                                  workerAgents: updatedAgents,
                                }));
                              }}
                              className="text-blue-200 hover:text-blue-300 focus:outline-none mt-2"
                            >
                              {localData.workerAgents[index].expanded
                                ? `- Collapse`
                                : `+ ${localData.workerAgents[index].role}`}
                            </button>
                            {localData.workerAgents[index].expanded && (
                              <fieldset className="border border-gray-400 p-2 rounded-md relative">
                                <legend className="text-gray-400 text-sm px-1">
                                  Worker {index + 1}
                                </legend>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedAgents = [
                                      ...localData.workerAgents,
                                    ];
                                    updatedAgents.splice(index, 1);
                                    setLocalData((prevData) => ({
                                      ...prevData,
                                      workerAgents: updatedAgents,
                                    }));
                                  }}
                                  className="absolute top-[-18px] right-[-8px] text-red-700 hover:text-red-800 focus:outline-none bg-gray-600 border border-gray-500 rounded-full"
                                >
                                  <XMarkIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                                <input
                                  id={`worker-agent.${index}.role`}
                                  name={`worker-agent.${index}.role`}
                                  value={
                                    localData?.workerAgents?.[index]?.role || ""
                                  }
                                  onChange={handleChangeWorkers}
                                  placeholder={`Role`}
                                  className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                                />
                                <textarea
                                  rows={2}
                                  id={`worker-agent.${index}.goal`}
                                  name={`worker-agent.${index}.goal`}
                                  value={
                                    localData?.workerAgents?.[index]?.goal || ""
                                  }
                                  onChange={handleChangeWorkers}
                                  placeholder={`Goal`}
                                  className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                                />
                                <textarea
                                  rows={4}
                                  id={`worker-agent.${index}.backstory`}
                                  name={`worker-agent.${index}.backstory`}
                                  value={
                                    localData?.workerAgents?.[index]
                                      ?.backstory || ""
                                  }
                                  onChange={handleChangeWorkers}
                                  placeholder={`Backstory`}
                                  className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2"
                                />
                              </fieldset>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-sm font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
                        onClick={handleAddAgent}
                      >
                        + Add Agent
                      </button>
                    </div>
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
            setHierarchicalContext({
              managerAgent: {
                role: "",
                goal: "",
                backstory: "",
              },
              workerAgents: [],
            });

            setLocalData({
              managerAgent: {
                role: "",
                goal: "",
                backstory: "",
              },
              workerAgents: [],
            });
          }}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={(e) => handleUpdateCrewConfig()}
          className="ml-4 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Edit Crew
        </button>
      </div>
    </div>
  );
};
