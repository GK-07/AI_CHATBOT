import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: "User with this email does not exist or token malfunctioned",
      });
    }

    //Get User's chat
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });

    user.chats.push({ role: "user", content: message });
    //Send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    //Get response from openAI API
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
