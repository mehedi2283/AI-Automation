import { GoogleGenAI } from "@google/genai";
import { Workflow } from "../types";

// Initialize the client with the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const runWorkflow = async (workflow: Workflow, userInput: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: workflow.model,
      contents: userInput,
      config: {
        systemInstruction: workflow.systemInstruction,
        temperature: workflow.temperature,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to execute workflow. Please check the console for details.");
  }
};

export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Fast)' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro (Reasoning)' },
];
