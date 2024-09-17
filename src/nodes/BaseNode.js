import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, data, title, children }) => {
  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>{title}</span>
      </div>
      <div>
        {children({
          currName: data?.inputName || id.replace('customInput-', 'input_'),
          setCurrName: (name) => {}, 
          inputType: data.inputType || 'Text',
          setInputType: (type) => {},
        })}
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
};

export default BaseNode;
