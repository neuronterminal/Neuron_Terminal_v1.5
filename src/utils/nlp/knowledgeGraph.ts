export class KnowledgeGraph {
  private nodes: Map<string, any> = new Map();
  private edges: Map<string, Set<string>> = new Map();
  private relationships: Map<string, Set<string>> = new Map();

  addNode(id: string, data: any) {
    this.nodes.set(id, data);
    this.edges.set(id, new Set());
    return id;
  }

  addRelationship(sourceId: string, targetId: string, type: string) {
    if (this.nodes.has(sourceId) && this.nodes.has(targetId)) {
      if (!this.relationships.has(type)) {
        this.relationships.set(type, new Set());
      }
      this.relationships.get(type)?.add(`${sourceId}-${targetId}`);
      this.edges.get(sourceId)?.add(targetId);
    }
  }

  getNode(id: string) {
    return this.nodes.get(id);
  }

  getConnections(id: string) {
    return Array.from(this.edges.get(id) || []);
  }

  findRelatedConcepts(concept: string): any[] {
    const matches = Array.from(this.nodes.entries())
      .filter(([_, data]) => data.concept?.toLowerCase().includes(concept.toLowerCase()));
    return matches.map(([id, data]) => ({ id, ...data }));
  }

  getRelationships(type?: string): string[] {
    if (type) {
      return Array.from(this.relationships.get(type) || []);
    }
    return Array.from(this.relationships.values())
      .flatMap(set => Array.from(set));
  }
}