from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: str
    data: str
    width: str
    height: str

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")  
async def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    # Extract node IDs for validation
    node_ids = {node.id for node in nodes}
    
    # Debug: Log incoming data
    print("Received pipeline data:", pipeline.dict())

    # Validate edges
    valid_edges = [edge for edge in edges if edge.source in node_ids and edge.target in node_ids]
    
    if not valid_edges:
        raise HTTPException(status_code=400, detail="No valid edges found.")

    # Create a graph and check for DAG
    G = nx.DiGraph()
    G.add_nodes_from(node_ids)
    G.add_edges_from((edge.source, edge.target) for edge in valid_edges)
    
    num_nodes = len(node_ids)
    num_edges = len(valid_edges)
    is_dag = nx.is_directed_acyclic_graph(G)

    # Debug: Log counts
    print(f"Number of nodes: {num_nodes}")
    print(f"Number of edges: {num_edges}")

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
