
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { MathNode } from "./nodes/MathNode";
import { TextProcessingNode } from "./nodes/TextProcessingNode";
import { DataFetchNode } from "./nodes/DataFetchNode";
import { ConditionalNode } from "./nodes/ConditionalNode";
import { TransformationNode } from "./nodes/TransformationNode";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  textProcessing: TextProcessingNode,
  dataFetch: DataFetchNode,
  conditional: ConditionalNode,
  transformation: TransformationNode,
};

export const PipelineUI = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges,
}) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => {
      console.log("TETS");
      setEdges((eds) => [...eds, { ...params, id: `e${eds.length + 1}` }]); 
    },
    [setEdges]
  );
  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"));
     const type = appData.nodeType 
      if (type) {
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };
        const nodeID = uuidv4()
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        setNodes((nds) => [...nds, newNode]);
      }
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
export default PipelineUI;
