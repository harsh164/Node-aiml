
import React from 'react';
import BaseNode from './BaseNode';

export const TransformationNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transformation Node"
    >
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div>
          <label>
            Transformation:
            <input 
              type="text" 
              value={currName} 
              onChange={setCurrName} 
            />
          </label>
          <label>
            Format:
            <select value={inputType} onChange={setInputType}>
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
              <option value="CSV">CSV</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
};
