"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useHierarchicalContext } from "@/context/hierarchical-context";
import { Separator } from "@/components/shared/separator";
import { toast } from "react-toastify";
import { errorReporter } from "@/shared/errorReporter";
import { validateFlow } from "@/components/hierarchical/helpers/validate-flow";

interface P {
  topNavHeight: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Drawer(P: P) {
  const [agentCount, setAgentCount] = useState(0);
  const { context, setHierarchicalContext } = useHierarchicalContext();

  const [localData, setLocalData] = useState({
    agents: context.agents || {},
    flow: context.flow || "",
  });

  const handleAddAgent = () => {
    if (agentCount < 10) {
      setAgentCount(agentCount + 1);
    }
  };

  const handleRemoveAgent = () => {
    if (agentCount > 0) {
      delete localData.agents[agentCount - 1];

      setLocalData((prevData) => ({
        ...prevData,
        agents: {
          ...localData.agents,
        },
      }));

      setAgentCount(agentCount - 1);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name.startsWith("agents.")) {
      const [_, agentKey, agentProperty] = name.split(".");
      setLocalData((prevData) => ({
        ...prevData,
        agents: {
          ...prevData.agents,
          [agentKey]: {
            ...prevData.agents[agentKey],
            [agentProperty]: value,
          },
        },
      }));
    } else {
      setLocalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      validateFlow({
        agents: localData.agents,
        flow: localData.flow,
      });

      setHierarchicalContext(localData);
      toast.success("Swarm customized successfully");
    } catch (error) {
      errorReporter(error, true);
      // toast.error("Failed to customize swarm");
    }
  };

  // console.log(context);

  return (
    <Dialog open={P.open} onClose={P.setOpen} className={`relative z-10`}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 pt-16`}
          >
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-96 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 border-gray-900 border-l-2"
            >
              <form
                className="flex h-full flex-col divide-y divide-gray-700 bg-gray-800 shadow-xl"
                onSubmit={handleSubmit}
              >
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-black px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-white">
                        Design (Drawer)
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => P.setOpen(false)}
                          className="relative rounded-md bg-blue-700 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-blue-300">
                        Customize your Swarm using the form below
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <div>
                            <label
                              htmlFor="agents"
                              className="block text-sm font-medium leading-6 text-gray-200"
                            >
                              Agents
                            </label>
                            <div className="mt-2">
                              {[...Array(agentCount)].map((_, index) => (
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
                                      key={index}
                                      id={`agents.${index}.system_prompt`}
                                      name={`agents.${index}.system_prompt`}
                                      value={
                                        localData?.agents?.[index]
                                          ?.system_prompt || ""
                                      }
                                      onChange={handleChange}
                                      placeholder={`System prompt`}
                                      className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mt-2 resize-none h-14"
                                    />
                                  </fieldset>
                                  <Separator className="my-4 bg-gray-700" />
                                </div>
                              ))}
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
                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={() => P.setOpen(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
