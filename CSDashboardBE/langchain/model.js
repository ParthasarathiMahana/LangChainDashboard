const { ChatOllama } = require("@langchain/ollama");

const llm = new ChatOllama({
  model: "llama3",
  temperature: 0,
  maxRetries: 2,
  // other params...
});

module.exports = {llm}