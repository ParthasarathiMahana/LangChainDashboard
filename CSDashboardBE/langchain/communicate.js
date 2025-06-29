const { llm } = require("./model.js")
const {ChatPromptTemplate} = require("@langchain/core/prompts")

const askAI = async () => {

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful customer support executive who takes question from an user and use {user_data}, {order_data} to provide a response. please do not include {user_data} or {order_data} in your response."],
    ["human", "{question}"],
  ])

  const chain = prompt.pipe(llm)
  let response = await chain.invoke({
    question:"Why is my order getting delayed?",
    user_data: {name:"Partha"},
    order_data:{orderId:1234532451, status:"in transit", delivery_mode:"flight", order_date:"20-june-2025", shipped_from:"dubai", product_detail:{name:"Audimars Piguet Royal oak", price:"INR 4500000", type:"luxury"}}
  })

    // const aiMsg = await llm.invoke([
    //     [
    //       "system",
    //       "You are a helpful customer support executive who takes {question} from an user and use {user_data}, {order_data}, or {product_data} to provide a response.",
    //     ],
    //     ["human", "{input}"],
    //   ]);
  console.log("Response from Ollama:", response?.content);
  };
  
  askAI();

  module.exports = {askAI}