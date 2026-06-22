import 'dotenv/config'

import { GoogleGenAI, FunctionCallingConfigMode } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const Gemini = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const DB = []

DB.push(
    {
        role: "user",
        parts: [
            { text: "Hi there!" }
        ]
    }
);

const isBotDeclaration = {
    name: "isBot",
    description: "Checks whether the message equals 'Hi there'",
    parametersJsonSchema: {
        type: "object",
        properties: {
            msg: {
                type: "string"
            }
        },
        required: ["msg"]
    }
}

    ;(async function main() {
        const response = await Gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: DB,
            config: {
                toolConfig: {
                    functionCallingConfig: {
                        // Force it to call any function
                        mode: FunctionCallingConfigMode.ANY,
                        allowedFunctionNames: ['isBot'],
                    }
                },
                tools: [{ functionDeclarations: [isBotDeclaration] }]
            }
        });

        const call = response.functionCalls[0];

        const result = isBot(call.args);
        console.log("Result:-", result);
    })()

const isBot = ({ msg }) => {
    return msg === 'Hi there'
}

