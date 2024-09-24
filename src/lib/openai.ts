// import OpenAI from 'openai';
// import { env } from 'process';
// require('dotenv').config();

// const openai = new OpenAI({
//     apiKey: env.OPENAI_API_KEY,
//     organization: "org-HmjU7sAlcFVjPvXbWJSkomgn",  // optional
// });

// async function generateChatbotReply(userMessage: string, buddyData: any, chatHistory: any) {
//     const response = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//             { role: "system", content: "You are a friendly chatbot helping users break the ice before meeting at an event." },
//             { role: "system", content: `Event: ${buddyData?.event.title}.` },
//             { role: "system", content: `Common attributes: ${buddyData?.commonAttributes || 'No common attributes'}` },
//             { role: "system", content: `Chat History: ${chatHistory.map((msg: any) => `${msg.sender}: ${msg.text}`).join(' ')}` },
//             { role: "user", content: userMessage }
//         ],
//         temperature: 0.7,
//     });
//     return response.choices[0].message.content;
// }

// export { generateChatbotReply };
