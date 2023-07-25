import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });

  const keyword = `300 BNB`;

  const openai = new OpenAIApi(config);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 1,
    // max_tokens: 750,
    prompt: `Advise investation method in Defi, if I have ${keyword}
    The content should be formatted in SEO-friendly HTML.
    The response must include appropriate HTML title and meta description content.
    `,
  });
  res.status(200).json(response.data.choices[0].text?.split("\n").join(""));
}
