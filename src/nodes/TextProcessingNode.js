
import React from 'react';
import BaseNode from './BaseNode';

export const TextProcessingNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Processing Node"
    >
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div>
          <label>
            Process:
            <input 
              type="text" 
              value={currName} 
              onChange={setCurrName} 
            />
          </label>
          <label>
            Type:
            <select value={inputType} onChange={setInputType}>
              <option value="UpperCase">Upper Case</option>
              <option value="LowerCase">Lower Case</option>
              <option value="Capitalize">Capitalize</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
};
