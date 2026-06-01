import { START, Workflow } from '@kapso/workflows';

const workflow = new Workflow("untitled-workflow", {
  name: "Untitled workflow",
  status: "draft",
});

workflow.addNode(START, {
  "position": {
    "x": 100,
    "y": 100
  }
});

export default workflow;
