import React, { useCallback, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import PipelineUI from './ui';
import { SubmitButton } from './submit';
import { InputNode } from './nodes/inputNode';
import { TextNode } from './nodes/textNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, { MiniMap, Controls, Background, useEdgesState, useNodesState, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  
  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    console.log(event)
    console.log("TEST")
    if (type) {
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} Node` },
        width: 100,  
        height: 50,  
      };

      setNodes((nds) => [...nds, newNode]);
    }
  }, [setNodes]);

 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);



  const onConnect = useCallback((params) => {
  console.log("TETS")
    setEdges((eds) => [...eds, { ...params, id: `e${eds.length + 1}` }]); 
  }, [setEdges]);

  return (

    <div style={{ height: '100vh' }}>
      <PipelineToolbar />
      <PipelineUI nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} setNodes={setNodes} setEdges={setEdges} />
      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;
