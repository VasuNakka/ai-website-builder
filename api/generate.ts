import { generateWebsite } from "../src/server/gemini";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method Not Allowed",
        });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Prompt is required",
            });
        }

        const project = await generateWebsite(prompt);

        return res.status(200).json(project);
    } catch (error: any) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to generate website",
            details: error.message,
        });
    }
}