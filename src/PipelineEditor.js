
import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { SubmitButtonButton } from './submitbutton';
import { InputNode } from './nodes/InputNode';
import { TextNode } from './nodes/textNode';
import { LLMNode } from './nodes/LLMNode';
import { OutputNode } from './nodes/OutputNode';


const initialNodes = [
  { id: 'InputNode1', type: 'input', position: { x: 50, y: 50 }, data: { currName: 'Input 1', inputType: 'Text' } },
  { id: 'LLMNode1', type: 'llm', position: { x: 250, y: 50 }, data: {} },
  { id: 'textNode1', type: 'text', position: { x: 450, y: 50 }, data: { text: '{{input}}' } },
  { id: 'OutputNode1', type: 'output', position: { x: 650, y: 50 }, data: { outputName: 'Output 1', outputType: 'Text' } },
];

const initialEdges = [
  { id: 'edge1', source: 'InputNode1', target: 'LLMNode1' },
  { id: 'edge2', source: 'LLMNode1', target: 'textNode1' },
  { id: 'edge3', source: 'textNode1', target: 'OutputNode1' }
];

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
  text: TextNode,
};

export const PipelineEditor = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        style={{ background: '#f0f0f0' }}
      />
      <SubmitButtonButton nodes={initialNodes} edges={initialEdges} />
    </div>
  );
};
export default PipelineEditor