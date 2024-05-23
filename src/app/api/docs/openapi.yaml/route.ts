import { getApiDocs } from "@/modules/swagger/getApiDocs";

export async function GET(_request: Request) {
    // Do whatever you want
    const spec = await getApiDocs();
    return new Response(JSON.stringify(spec), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
  }