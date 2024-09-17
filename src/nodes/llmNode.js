import React from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const nodeStyle = {
    width: '13rem',
    height: '5rem',
    border: '2px solid #6b46c1',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const handleStyle = (color) => ({
    backgroundColor: color,
    border: `2px solid ${color}`,
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  });

  return (
    <BaseNode id={id} data={data} title="LLM Node">
      {({ currName }) => (
        <div style={nodeStyle}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-system`}
            style={{
              ...handleStyle('#6b46c1'),
              top: '25%',
              left: '0',
            }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-prompt`}
            style={{
              ...handleStyle('#6b46c1'),
              top: '75%',
              left: '0',
            }}
          />
          <div style={{ textAlign: 'center', fontWeight: '500', color: '#4a5568' }}>
            <span style={{ display: 'block', color: '#6b46c1' }}>LLM</span>
          </div>
          <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
            <span>This is an LLM.</span>
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-response`}
            style={{
              ...handleStyle('#10b981'),
              right: '0',
              top: '50%',
            }}
          />
        </div>
      )}
    </BaseNode>
  );
};
