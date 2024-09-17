import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';

const inputNodeStyle = (width, height) => ({
  padding: '1.5rem',
  border: '2px solid #6b46c1',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: width || '200px', 
  height: height || '150px', 
});

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontWeight: '500',
  color: '#000', 
};

const inputStyle = {
  marginTop: '0.5rem',
  padding: '0.75rem',
  border: '2px solid #d6bcfa',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  outline: 'none',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: '#ffffff',
};

export const InputNode = ({ id, data, position, width, height }) => {
  const [currName, setCurrName] = React.useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = React.useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode id={id} data={data} title="Input Node">
      {({ currName, setCurrName, inputType, setInputType }) => (
        <div style={inputNodeStyle(width, height)}>
          <label style={labelStyle} htmlFor={`${id}-name`}>
            <span style={{ color: '#6b46c1', fontSize: '1.125rem' }}>Name:</span>
            <input
              type="text"
              id={`${id}-name`}
              name={`${id}-name`}
              value={currName}
              onChange={handleNameChange}
              style={inputStyle}
              placeholder="Enter name"
              onFocus={(e) => e.target.style.borderColor = '#6b46c1'}
              onBlur={(e) => e.target.style.borderColor = '#d6bcfa'}
            />
          </label>
          <label style={labelStyle} htmlFor={`${id}-type`}>
            <span style={{ color: '#6b46c1', fontSize: '1.125rem' }}>Type:</span>
            <select
              id={`${id}-type`}
              name={`${id}-type`}
              value={inputType}
              onChange={handleTypeChange}
              style={selectStyle}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
          <Handle type="source" position={Position.Right} id={`${id}-value`} />
        </div>
      )}
    </BaseNode>
  );
};
