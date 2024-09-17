import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

const outputNodeStyle = {
  width: '13rem',
  height: '8rem',
  border: '2px solid #6b46c1',
  borderRadius: '0.5rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
};

const handleStyle = {
  backgroundColor: '#3b82f6',
  border: '2px solid #6b46c1',
  width: '1rem',
  height: '1rem',
  borderRadius: '50%',
  position: 'absolute',
};

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode id={id} data={data} title="Output Node">
      {({ currName, inputType }) => (
        <div style={outputNodeStyle}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-value`}
            style={{ ...handleStyle, top: '25%', left: '0' }}
          />
          <div style={{ textAlign: 'center', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
            <span>Output</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor={`${id}-name`} style={{ display: 'flex', flexDirection: 'column', fontWeight: '500', color: '#4a5568' }}>
              Name:
              <input
                type="text"
                id={`${id}-name`}
                name={`${id}-name`}
                value={currName}
                onChange={(e) => setCurrName(e.target.value)}
                style={{ marginTop: '0.25rem', padding: '0.5rem', border: '2px solid #6b46c1', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out', backgroundColor: '#ffffff' }}
                placeholder="Enter name"
              />
            </label>
            <label htmlFor={`${id}-type`} style={{ display: 'flex', flexDirection: 'column', fontWeight: '500', color: '#4a5568' }}>
              Type:
              <select
                id={`${id}-type`}
                name={`${id}-type`}
                value={outputType}
                onChange={(e) => setOutputType(e.target.value)}
                style={{ marginTop: '0.25rem', padding: '0.5rem', border: '2px solid #6b46c1', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', backgroundColor: '#ffffff' }}
              >
                <option value="Text">Text</option>
                <option value="File">Image</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </BaseNode>
  );
};
