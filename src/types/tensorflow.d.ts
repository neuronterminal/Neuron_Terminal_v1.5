declare module '@tensorflow/tfjs' {
  export interface LayerArgs {
    units?: number;
    activation?: string;
    inputShape?: number[];
    returnSequences?: boolean;
  }
}