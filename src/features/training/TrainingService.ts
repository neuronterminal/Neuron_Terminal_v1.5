
export class TrainingService {
  async initialize() {
    console.log('Training service initialized (mock)');
  }

  async trainOnMessages() {
    console.log('Training not supported in this version');
  }

  async generateResponse(): Promise<string | null> {
    return null;
  }
}
