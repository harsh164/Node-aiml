import React, { useState } from 'react';

export const SubmitButton = ({ nodes = [], edges = [] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (nodes, edges) => {
    return nodes.length > 0 && edges.length > 0;
  };

  const transformData = (nodes, edges) => {
    return {
      nodes: nodes.map(node => ({
        ...node,
        position: JSON.stringify(node.position), 
        data: JSON.stringify(node.data),
        width: node.width.toString(), 
        height: node.height.toString()
      })),
      edges: edges.map(edge => ({
        ...edge,
        id: edge.id.toString(),
        source: edge.source.toString(),
        target: edge.target.toString()
      }))
    };
  };

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    setLoading(true);
    setError(null);
    console.log(nodes, edges)

  
    console.log('Raw nodes:', nodes);
    console.log('Raw edges:', edges);

    if (!validateData(nodes, edges)) {
      setError('Invalid data format');
      setLoading(false);
      return;
    }

    try {
      const transformedData = transformData(nodes, edges);

 
      console.log('Transformed nodes:', transformedData.nodes);
      console.log('Transformed edges:', transformedData.edges);

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Network response error:', errorText); 
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const { num_nodes, num_edges, is_dag } = data;
      alert(`Number of nodes: ${num_nodes}\nNumber of edges: ${num_edges}\nIs DAG: ${is_dag}`);
    } catch (error) {
      console.error('Error occurred:', error.message);
      setError(`Error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '0.375rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Running...' : 'Run'}
      </button>
      {error && <p style={{ color: 'red', marginLeft: '1rem' }}>{error}</p>}
    </div>
  );
};
