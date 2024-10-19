interface ValidateFlowOptions {
  flow: string;
  agents: Record<
    string,
    {
      name: string;
      system_prompt: string;
    }
  >;
}

export function validateFlow({ flow, agents }: ValidateFlowOptions): boolean {
  /**
   * Validates the flow pattern.
   *
   * Raises:
   *   Error: If the flow pattern is incorrectly formatted or contains duplicate agent names.
   *
   * Returns:
   *   bool: True if the flow pattern is valid.
   */

  const agentsInFlow: string[] = [];

  // Split the flow into tasks using '->'
  const tasks = flow.split("->");

  let agentsAsList: string[] = [];
  Object.keys(agents).forEach((key) => {
    agentsAsList.push(agents[key].name);
  });

  // Iterate through each task
  for (const task of tasks) {
    const agentNames = task.split(",").map((name) => name.trim());

    // Loop over the agent names
    for (const agentName of agentNames) {
      if (!agentsAsList.includes(agentName) && agentName !== "H") {
        throw new Error(`Agent '${agentName}' is not registered.`);
      }
      agentsInFlow.push(agentName);
    }
  }

  // Check for duplicate agent names in the flow
  if (new Set(agentsInFlow).size !== agentsInFlow.length) {
    throw new Error("Duplicate agent names in the flow are not allowed.");
  }

  return true;
}
