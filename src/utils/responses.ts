const responses = {
  general: [
    "I understand. Could you tell me more about that?",
    "That's interesting. How does that make you feel?",
    "I see. What are your thoughts on this?",
    "Could you elaborate on that?",
    "Tell me more about your perspective."
  ],
  error: [
    "I apologize, but I encountered an error. Could you please try again?",
    "Something went wrong. Could you rephrase that?",
    "I'm having trouble processing that. Could you try again?"
  ]
};

export function getResponse(type: keyof typeof responses): string {
  const options = responses[type];
  return options[Math.floor(Math.random() * options.length)];
}