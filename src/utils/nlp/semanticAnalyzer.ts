import { generateCompletionFromOpenAI } from '../../services/aiService';
import { extractEntities } from './entityExtractor';
import { analyzeIntent } from './intentAnalyzer';
import { extractKeywords } from './keywordExtractor';
import { extractRelationships } from './relationshipExtractor';

interface SemanticAnalysisResult {
  entities: string[];
  intent: string;
  keywords: string[];
  relationships: any[];
  confidence: number;
}

/**
 * Performs comprehensive semantic analysis on input text
 * @param text The input text to analyze
 * @returns A promise containing the semantic analysis results
 */
export async function performSemanticAnalysis(text: string): Promise<SemanticAnalysisResult> {
  try {
    // Perform various NLP analyses in parallel
    const [entities, intent, keywords, relationships] = await Promise.all([
      extractEntities(text),
      analyzeIntent(text),
      extractKeywords(text),
      extractRelationships(text)
    ]);

    // Calculate confidence score based on the consistency and completeness of results
    const confidence = calculateConfidenceScore(entities, intent, keywords, relationships);

    // Return combined analysis result
    return {
      entities,
      intent,
      keywords,
      relationships,
      confidence
    };
  } catch (error) {
    console.error('Error in semantic analysis:', error);
    throw new Error(`Semantic analysis failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Calculate a confidence score for the semantic analysis
 * @param entities Extracted entities
 * @param intent Analyzed intent
 * @param keywords Extracted keywords
 * @param relationships Extracted relationships
 * @returns A confidence score between 0 and 1
 */
function calculateConfidenceScore(
  entities: string[],
  intent: string,
  keywords: string[],
  relationships: any[]
): number {
  // Basic confidence calculation
  let score = 0;

  // Add points for each successful extraction
  if (entities.length > 0) score += 0.25;
  if (intent && intent.length > 0) score += 0.25;
  if (keywords.length > 0) score += 0.25;
  if (relationships.length > 0) score += 0.25;

  return score;
}

/**
 * Enhances semantic analysis with AI-based contextual understanding
 * @param text The input text to analyze
 * @param initialAnalysis Initial semantic analysis results
 * @returns Enhanced semantic analysis
 */
export async function enhanceWithAI(
  text: string,
  initialAnalysis: SemanticAnalysisResult
): Promise<SemanticAnalysisResult> {
  try {
    // Construct a prompt for the AI model
    const prompt = `
      Enhance this semantic analysis:
      
      Text: "${text}"
      
      Initial Analysis:
      - Entities: ${initialAnalysis.entities.join(', ')}
      - Intent: ${initialAnalysis.intent}
      - Keywords: ${initialAnalysis.keywords.join(', ')}
      - Relationships: ${JSON.stringify(initialAnalysis.relationships)}
      
      Provide improved entities, intent, keywords, and relationships in JSON format.
    `;

    // Get enhanced analysis from AI
    const aiResponse = await generateCompletionFromOpenAI(prompt);
    
    // Parse the AI response
    let enhancedAnalysis;
    try {
      enhancedAnalysis = JSON.parse(aiResponse);
    } catch (e) {
      console.warn('Failed to parse AI response as JSON, using initial analysis');
      return initialAnalysis;
    }
    
    // Merge the initial and enhanced analyses, preferring the enhanced one
    return {
      entities: enhancedAnalysis.entities || initialAnalysis.entities,
      intent: enhancedAnalysis.intent || initialAnalysis.intent,
      keywords: enhancedAnalysis.keywords || initialAnalysis.keywords,
      relationships: enhancedAnalysis.relationships || initialAnalysis.relationships,
      confidence: Math.min(1, initialAnalysis.confidence + 0.2) // Slightly boost confidence, capped at 1
    };
  } catch (error) {
    console.error('Error enhancing analysis with AI:', error);
    // Return the initial analysis if enhancement fails
    return initialAnalysis;
  }
}
