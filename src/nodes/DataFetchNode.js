
import React from 'react';
import BaseNode from './BaseNode';

export const DataFetchNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Fetch Node"
    >
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div>
          <label>
            URL:
            <input 
              type="text" 
              value={currName} 
              onChange={setCurrName} 
            />
          </label>
          <label>
            Method:
            <select value={inputType} onChange={setInputType}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
};
