// import { NextApiRequest, NextApiResponse } from 'next';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { message, event, userData } = req.body;

//         try {
//             const chatCompletion = await openai.chat.completions.create({
//                 model: 'gpt-4o-mini',
//                 messages: [
//                     { role: 'user', content: message },
//                     // You can add additional context about the event or userData if needed
//                 ],
//             });

//             const response = chatCompletion.choices[0].message.content;

//             res.status(200).json({ response });
//         } catch (error) {
//             console.error('Error fetching chatbot response:', error);
//             res.status(500).json({ error: 'Failed to fetch chatbot response' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
