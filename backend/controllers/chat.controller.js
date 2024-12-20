import OpenAI from "openai";

export const openAIResponse = async (req, res) => {
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ error: "No input provided" });
  }

  try {
    const openai = new OpenAI({
      //   organization: process.env.ORG_ID,
      //   project: process.env.PROJECT_ID,
      apiKey: process.env.OPENAI_API_KEY1,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userInput }],
    });

    res.json({
      message: response.choices[0]?.message?.content || "No response",
    });
  } catch (err) {
    console.error("error in openaichat controller ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
