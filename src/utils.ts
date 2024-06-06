import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser  } from "@langchain/core/output_parsers";

export type Colors = {colors: string[]}


export const getColors = async  (text: string) => {
  const model = new ChatGroq({
    apiKey: "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", 
    modelName:"llama3-70b-8192",
  });

  const formatInstructions = "Respond with a valid JSON object, containing just one field: 'colors' an array containing hex codes for the colors";
  

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant, you recieve a message containing a concept, an idea, 
      whatever you recieve, you will think of a color pallette related to the term that is given, there must be a really strong ressemblance between the 
      message of the user and the color pallete, it should be between 4 and 8 colors, pick any number between and output that quantity of hex codes\n\n
      NO MORE OR EXTRA TEXT, JUST THE JSON\n\n
      DONT RESPOND TO ANYTHING ELSE, YOU JUST OUTPUT COLORS\n\n
    {format_instructions}\n\n
    `,
    ],
    ["human", "{input}"],
  ]);

  const partialedPrompt = await prompt.partial({
    format_instructions: formatInstructions,
  });

  const parser = new JsonOutputParser<Colors>();

  const chain = partialedPrompt.pipe(model).pipe(parser);

  const res: Colors = await chain.invoke({ input: text });
  return res
};
