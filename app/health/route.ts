import { siteConfig } from "~/config/site";

export async function GET() {
  return new Response(`Hello from ${siteConfig.name}!`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
