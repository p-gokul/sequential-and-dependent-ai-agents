import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import readlineSync from "readline-sync";

// Define schema
const nums = z.object({
  num1: z.number(),
  num2: z.number(),
});

type Inums = z.infer<typeof nums>;

// Add tool
const AddTool = tool({
  name: "addition_function",
  description:
    "This function takes two numbers (num1 and num2) and returns their sum.",
  parameters: nums,
  execute: async ({ num1, num2 }: Inums) => {
    console.log("Addition Executed");
    return num1 + num2;
  },
});

// Subtract tool
const SubtractTool = tool({
  name: "subtraction_function",
  description:
    "This function takes two numbers (num1 and num2) and returns their difference (num1 - num2).",
  parameters: nums,
  execute: async ({ num1, num2 }: Inums) => {
    console.log("Subtraction Executed");

    return num1 - num2;
  },
});

// Multiply tool
const MultiplyTool = tool({
  name: "multiplication_function",
  description:
    "This function takes two numbers (num1 and num2) and returns their product.",
  parameters: nums,
  execute: async ({ num1, num2 }: Inums) => {
    console.log("Multiplication Executed");

    return num1 * num2;
  },
});

// Divide tool
const DivideTool = tool({
  name: "division_function",
  description:
    "This function takes two numbers (num1 and num2) and returns the result of division (num1 / num2). If num2 is zero, it will return an error message.",
  parameters: nums,
  execute: async ({ num1, num2 }: Inums) => {
    console.log("Division Executed");

    if (num2 === 0) {
      return "Error: Division by zero is not allowed.";
    }
    return num1 / num2;
  },
});

// Create agent with all tools
const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant.",
  tools: [AddTool, SubtractTool, MultiplyTool, DivideTool],
});

// Take input
const input = readlineSync.question("User--> "); // eg: Give me the addition of 345 and 763. Then subtract 123 from the result. Then multiply result by 12. Finally, divide the result by 5.

// Run agent
const result = await run(agent, input);
console.log(result.finalOutput);
