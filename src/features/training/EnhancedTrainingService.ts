import { Message } from '../../types/chat';
import { DataPreprocessor } from './DataPreprocessor';
import { ConceptPreprocessor } from './ConceptPreprocessor';
import { AdvancedTrainingManager } from './AdvancedTrainingManager';

export class EnhancedTrainingService {
  private dataPreprocessor: DataPreprocessor;
  private conceptPreprocessor: ConceptPreprocessor;
  private trainingManager: AdvancedTrainingManager;
  private initialized: boolean = false;

  constructor() {
    this.dataPreprocessor = new DataPreprocessor();
    this.conceptPreprocessor = new ConceptPreprocessor();
    this.trainingManager = new AdvancedTrainingManager();
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      await this.trainingManager.initializeModels();
      await this.trainingManager.loadModels();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize training service:', error);
      throw error;
    }
  }

  // Rest of the code remains the same...
}