export async function GET() {
  try {
    if (true) {
      throw new Error("API throw error test");
      // return new Response("API GET response test", { status: 200 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
