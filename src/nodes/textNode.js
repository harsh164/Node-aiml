import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const nodeRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.style.width = 'auto';
      nodeRef.current.style.height = 'auto';
    }

    
    const variableMatches = currText.match(/\{\{\s*(\w+)\s*\}\}/g) || [];
    setVariables(variableMatches.map(match => match.replace(/\{\{\s*|\s*\}\}/g, '')));

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const containerStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    minWidth: '12.5rem',
    position: 'relative',
  };

  const handleStyle = (color) => ({
    backgroundColor: color,
    border: `1px solid ${color}`,
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  });

  const textareaStyle = {
    marginTop: '0.25rem',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    width: '100%',
    resize: 'none', 
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '500',
    color: '#4a5568',
  };

  return (
    <div ref={nodeRef} style={containerStyle}>
      <div style={{ textAlign: 'center', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
        <span>Text</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <label style={labelStyle}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={textareaStyle}
            rows={4}
          />
        </label>
      </div>
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            ...handleStyle('#3b82f6'), 
            top: `${(index + 1) * (100 / (variables.length + 1))}%`,
            left: '0',
          }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={handleStyle('#10b981')} 
      />
    </div>
  );
};
