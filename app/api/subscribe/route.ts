import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topics, customTopics, frequency, format } = body;

    // Validate required fields
    if (!name || !email || !topics?.length || !frequency || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Forward to Make.com webhook (replace with your actual webhook URL)
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

    if (MAKE_WEBHOOK_URL) {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topics,
          customTopics: customTopics || "",
          frequency,
          format,
          subscribedAt: new Date().toISOString(),
        }),
      });
    }

    // Also store in Kit (ConvertKit) if API key is set
    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;

    if (KIT_API_KEY && KIT_FORM_ID) {
      // Build tags from topic selections
      const tagFields: Record<string, string> = {
        topics: topics.join(","),
        frequency,
        format,
      };

      if (customTopics) {
        tagFields.custom_topics = customTopics;
      }

      await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            first_name: name.split(" ")[0],
            fields: tagFields,
          }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
