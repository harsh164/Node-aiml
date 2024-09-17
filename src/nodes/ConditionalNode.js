
import React from 'react';
import BaseNode from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional Node"
    >
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div>
          <label>
            Condition:
            <input 
              type="text" 
              value={currName} 
              onChange={setCurrName} 
            />
          </label>
          <label>
            Type:
            <select value={inputType} onChange={setInputType}>
              <option value="If">If</option>
              <option value="Switch">Switch</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
};
