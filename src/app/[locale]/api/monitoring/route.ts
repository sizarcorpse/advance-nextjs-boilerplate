import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const envelope = await req.text();

    const piece = envelope.split("\n")[0];

    if (!piece) {
      return Response.json(
        { error: "Error can't be tunneled because the body is empty." },
        { status: 400 }
      );
    }
    const header = JSON.parse(piece);
    const dsn = new URL(header.dsn);

    if (dsn.hostname !== process.env.SENTRY_HOST) {
      return Response.json(
        { error: `Invalid Sentry host: ${dsn.hostname}` },
        { status: 400 }
      );
    }

    const project_id = dsn.pathname.substring(1);
    if (project_id !== process.env.SENTRY_PROJECT_ID) {
      return Response.json(
        { error: `Invalid Project ID: ${project_id}` },
        { status: 400 }
      );
    }

    const url = `https://${process.env.SENTRY_HOST}/api/${project_id}/envelope/`;

    const res = await fetch(url, {
      method: "POST",
      body: envelope,
      headers: {
        "Content-Type": "application/x-sentry-envelope",
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Could not tunnel Sentry error correctly." },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        error: "Could not tunnel Sentry error correctly.",
        data: (error as Error).message,
      },
      { status: 500 }
    );
  }

  return Response.json({ message: "Error sent." }, { status: 200 });
}

export async function GET() {
  return Response.json({ message: "Hello, World!" });
}
