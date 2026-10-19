import { useEffect, useRef } from "react";

const URL = "ws://localhost:8000/ws";

export default function useSocket(onMessage) {
  const wsRef = useRef(null);
  const handlerRef = useRef(onMessage);
  handlerRef.current = onMessage;

  useEffect(() => {
    const ws = new WebSocket(URL);
    wsRef.current = ws;
    ws.onmessage = (e) => handlerRef.current(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  function send(msg) {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }

  return send;
}