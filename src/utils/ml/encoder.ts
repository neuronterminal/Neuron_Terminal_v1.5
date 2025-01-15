
export async function loadModel(): Promise<any> {
  return null;
}

export async function embedText(text: string): Promise<number[]> {

  return new Array(512).fill(0).map(() => Math.random());
}

export async function getSimilarity(text1: string, text2: string): Promise<number> {
 
  return Math.random();
}
