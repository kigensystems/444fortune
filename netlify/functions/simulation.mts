import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
    const store = getStore("simulation");
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow CORS for development
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers });
    }

    try {
        if (req.method === "GET") {
            const startTimeStr = await store.get("startTime", { type: "text" });
            const startTime = startTimeStr ? parseInt(startTimeStr) : null;

            // Check if simulation is "running" (e.g. started within last 20 mins)
            const isRunning = startTime ? (Date.now() - startTime) < (20 * 60 * 1000) : false;

            return new Response(JSON.stringify({
                isRunning,
                startTime: isRunning ? startTime : null
            }), { headers });
        }

        if (req.method === "POST") {
            const body = await req.json();

            if (body.secret !== "FORTUNE444") {
                return new Response(JSON.stringify({ error: "Unauthorized" }), {
                    status: 401,
                    headers
                });
            }

            const newStartTime = Date.now();
            await store.set("startTime", newStartTime.toString());

            return new Response(JSON.stringify({
                success: true,
                startTime: newStartTime
            }), { headers });
        }

        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers
        });

    } catch (error) {
        console.error("Function error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers
        });
    }
};
