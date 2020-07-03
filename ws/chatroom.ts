import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const sockets = new Map<string, WebSocket>();

const chatConnection = async (ws: WebSocket) => {
  const uid = v4.generate();
  sockets.set(uid, ws);
  for await (const ev of ws) {
    console.log(ev);
    if (isWebSocketCloseEvent(ev)) sockets.delete(uid);
    if (typeof ev === "string") {
      const evObj = JSON.parse(ev);
      console.log(evObj);
    }
  }
};

export { chatConnection };
