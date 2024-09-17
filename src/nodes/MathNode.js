
import React from 'react';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  return (
    
    <BaseNode
      id={id}
      data={data}
      title="Math Node"
    >
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div>
          <label>
            Operation:
            <input 
              type="text" 
              value={currName} 
              onChange={setCurrName} 
            />
          </label>
          <label>
            Type:
            <select value={inputType} onChange={setInputType}>
              <option value="Add">Add</option>
              <option value="Subtract">Subtract</option>
              <option value="Multiply">Multiply</option>
              <option value="Divide">Divide</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
};
