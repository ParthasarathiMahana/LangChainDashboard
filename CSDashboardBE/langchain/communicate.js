const { HumanMessage, SystemMessage } = require("@langchain/core/messages")
const { llm } = require("./model.js")
console.log("model ", llm);


const run = async () => {
    // const messages = [
    //   new SystemMessage("Translate the following from English into Italian"),
    //   new HumanMessage("hi!"),
    // ];
  
    const aiMsg = await llm.invoke([
        [
          "system",
          "You are a helpful assistant that takes questions of an user and database record as input and depending on the database record provide a response.",
        ],
        ["human", "why my order is delayed? database_record:order_status=in transit"],
      ]);
    console.log("Response from GPT-4:", aiMsg);
  };
  
  run();