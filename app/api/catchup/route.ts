import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, topics, days } = body;

    // Validate required fields
    if (!email || !topics?.length || !days) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Forward to Make.com webhook for catch-up generation
    const MAKE_CATCHUP_WEBHOOK_URL = process.env.MAKE_CATCHUP_WEBHOOK_URL;

    if (MAKE_CATCHUP_WEBHOOK_URL) {
      const makeRes = await fetch(MAKE_CATCHUP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          topics,
          days,
          requestedAt: new Date().toISOString(),
        }),
      });

      if (makeRes.ok) {
        const data = await makeRes.json();
        return NextResponse.json({ stories: data.stories || [] });
      }
    }

    // Fallback: return placeholder stories if Make.com isn't connected yet
    const topicLabels: Record<string, string> = {
      "world-news": "World News",
      politics: "US Politics",
      stocks: "Stocks & Markets",
      "business-tech": "Business & Tech",
      science: "Science & Health",
      sports: "Sports",
      entertainment: "Entertainment",
      climate: "Climate & Energy",
    };

    const placeholderStories = topics.slice(0, 5).map(
      (topic: string, i: number) => ({
        headline: `Top ${topicLabels[topic] || topic} story from the past ${days} day${days > 1 ? "s" : ""}`,
        summary:
          "This is a placeholder. Once your Make.com automation is connected, real AI-generated catch-up stories will appear here based on the latest news for your selected topics.",
        topic,
        date: new Date(
          Date.now() - i * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      })
    );

    return NextResponse.json({ stories: placeholderStories });
  } catch (error) {
    console.error("Catchup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
