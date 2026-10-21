# AI API Integration Notes — Practical 13

## 1. Why the OpenAI API Key MUST be Kept Backend-Only

- **Client-Side Exposure Risks**: Any environment variable bundled into a frontend single-page application (such as Vite with `VITE_` prefixes) is compiled directly into static JavaScript files. Anyone inspecting DevTools Network tabs or source bundles can easily extract the key.
- **Quota Theft & Abuse**: A leaked API key can be exploited by automated scrapers, incurring massive unauthorized billing on the developer's account.
- **Architectural Security**: By proxying requests through `POST /api/ai/generate-description`, the secret key remains strictly server-side inside `backend/.env`. The backend acts as a gatekeeper, enforcing rate limits, authentication (`protect` JWT middleware), input sanitization, and request auditing.

---

## 2. Graceful Degradation Architecture

When external third-party APIs experience outages, rate limits, or invalid authentication tokens, the application must **never crash or halt the user experience**.

In `backend/controllers/aiController.js`:
```javascript
try {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You write concise 1-2 sentence task descriptions.' },
      { role: 'user', content: `Write a short task description for: ${title}` }
    ],
    max_tokens: 80
  });
  const description = completion.choices[0].message.content.trim();
  res.json({ success: true, description });
} catch (err) {
  console.error('[AI Error]', err.message);
  res.status(200).json({
    success: false,
    fallback: true,
    description: '',
    message: 'AI unavailable, please write the description manually.'
  });
}
```

- Returns HTTP status `200` with `fallback: true` rather than a blocking `500 Internal Server Error`.
- The frontend UI displays an informative inline alert (`AI unavailable, please type manually.`), allowing the user to seamlessly proceed with typing their own task description.

---

## 3. Privacy & Minimal Data Exposure

- **Payload Scope**: Only the task `title` entered by the user is forwarded to the OpenAI completion endpoint.
- **No Sensitive Personal Identifiable Information (PII)**: User passwords, emails, authentication tokens, and user IDs are never transmitted to the external AI provider.
- **Short-Lived Ephemeral Prompts**: No persistent chat history is retained on OpenAI servers for fine-tuning.

---

## 4. Fallback Test Procedure (Lab Demonstration)

To test and verify graceful degradation:
1. Open `backend/.env`.
2. Temporarily set an invalid key:
   ```env
   OPENAI_API_KEY=sk-invalid-placeholder-key-for-testing
   ```
3. Restart or trigger the backend server.
4. On the frontend `/tasks` page, enter a task title (e.g. `Prepare for Final Exam`) and click **✨ AI Suggest**.
5. Observe:
   - Backend terminal logs: `[AI Error] Incorrect API key provided...`
   - Frontend UI displays: `AI unavailable, please type manually.`
   - The user is completely unblocked and can save the task normally.
6. Restore the valid API key in `backend/.env`.

---

## 5. Responsible AI Principles

- **Human-in-the-Loop**: The AI provides *draft suggestions*, not final decisions. The generated text is placed into an editable form field rather than automatically committed to the database.
- **Clear AI Provenance**: Whenever AI-generated text populates the description field, an explicit disclaimer appears: *"AI-generated — please review and edit."*
- **User Agency**: The user has full control to edit, supplement, or completely replace the suggested text before submitting the task.
