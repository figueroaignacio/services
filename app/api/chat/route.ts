import { createAgentUIStreamResponse } from 'ai';
import { createAssistantAgent } from '@/lib/agents/assistant-agent';

// Ensure the route is dynamic and not cached
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, locale } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: "messages" must be an array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine the active locale, defaulting to Spanish
    const activeLocale = locale === 'en' ? 'en' : 'es';

    // Create the localized agent
    const agent = createAssistantAgent(activeLocale);

    // Stream the agent session (including automated tool loops)
    return await createAgentUIStreamResponse({
      agent,
      uiMessages: messages,
    });
  } catch (error: any) {
    console.error('[API Chat Route Error]:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred during chat stream processing.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
