interface CanvasRenderingContext2D {
  filter: string;
}

interface HTMLCanvasElement {
  getContext(contextId: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
}