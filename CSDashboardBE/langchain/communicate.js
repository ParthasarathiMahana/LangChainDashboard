const { llm } = require("./model.js")
const {ChatPromptTemplate} = require("@langchain/core/prompts")

const askAI = async (data, userDetails, question) => {

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful customer support executive who takes question from an user and use {user_data}, {data} to provide a response. please do not include {user_data} or {data} in your response."],
    ["human", "{question}"],
  ])

  const chain = prompt.pipe(llm)
  console.log(data, userDetails, question);
  
  let response = await chain.invoke({
    question:question,
    user_data: userDetails,
    data:data
  })

    const aiMsg = await llm.invoke([
        [
          "system",
          "You are a helpful customer support executive who takes {question} from an user and use {user_data}, {data}, or {product_data} to provide a response.",
        ],
        ["human", "{input}"],
      ]);
  console.log("Response from Ollama:", response?.content);
  return response?.content
  };
  
  askAI();

  module.exports = {askAI}