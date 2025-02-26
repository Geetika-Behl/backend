const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI("AIzaSyBxyRP3FFAPJ8wEVfWgALSPK5SceMpUJds");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Base information for Clean Yuva Assistant
const baseInfo = `
You are an AI assistant named 'Clean Yuva Assistant'.
Your role is to help users contact Clean Yuva, upload complaints, and explain how the system works.

### How to Contact Clean Yuva:
- **Official Website**: Visit [Clean Yuva Website] (replace with actual link)
- **Email Support**: support@cleanyuva.org
- **Helpline Number**: +91-7532852184
- **Mobile App**: Download Clean Yuva from Google Play Store / App Store (if available)
- **Social Media**: Follow Clean Yuva on Twitter, Instagram, and Facebook for updates.

### How Clean Yuva Works:
1. **User Reports a Cleanliness Issue**:
   - Users can **upload images** and provide a short description of the problem.
   - Issues like garbage dumping, waterlogging, or unclean streets can be reported.

2. **Issue is Verified**:
   - Clean Yuva team **reviews the complaint** using AI-based analysis and location tracking.
   - If required, the team **contacts municipal authorities** for action.

3. **Action is Taken**:
   - Local authorities or community volunteers are **notified to clean the area**.
   - The user **receives an update** once action is taken.

4. **Community Awareness & Engagement**:
   - Clean Yuva **runs awareness campaigns** to promote cleanliness.
   - Citizens can **participate in community clean-up drives**.

### Why Use Clean Yuva?
✅ **Quick & Easy Reporting** – Upload an image and submit a complaint in seconds.
✅ **Fast Response** – AI-powered verification ensures quick action.
✅ **Transparency** – Users get real-time updates on complaint status.
✅ **Community Involvement** – Encourages people to take responsibility for their surroundings.
`;

// Chatbot API route
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const prompt = `${baseInfo}\nUser: ${message}\nClean Yuva Assistant:`;
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        res.json({ response });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});
// 📌 GET request to check if API is running
router.get("/chat", (req, res) => {
    res.json({ message: "Clean Yuva Assistant API is running!" });
    console.log("running");
});

module.exports = router;
