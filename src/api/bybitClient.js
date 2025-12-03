const BYBIT_REST_BASE = "https://api.bybit.com";
const BYBIT_WS_BASE = "wss://stream.bybit.com/v5/public";

export class BybitClient {
  constructor({ logger } = {}) {
    this.logger = logger ?? console;
    this.ws = null;
    this.wsReady = false;
    this.subscriptions = new Set();
  }

  async fetchKlines({ symbol, interval, limit = 200 }) {
    const url = new URL("/v5/market/kline", BYBIT_REST_BASE);
    url.searchParams.set("category", "linear");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("interval", interval);
    url.searchParams.set("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      this.logger.error?.("Bybit REST error", res.status, res.statusText);
      throw new Error(`Bybit REST error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  connectTickerStream({ symbols, onMessage }) {
    if (this.ws) {
      return;
    }

    const url = `${BYBIT_WS_BASE}?stream=public.linear`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.wsReady = true;
      const topics = symbols.map((s) => `tickers.${s}`);
      this.subscriptions = new Set(topics);
      this.ws.send(
        JSON.stringify({
          op: "subscribe",
          args: topics
        })
      );
      this.logger.info?.("Bybit WS connected", { topics });
    };

    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        onMessage?.(payload);
      } catch (err) {
        this.logger.error?.("Bybit WS message parse error", err);
      }
    };

    this.ws.onerror = (event) => {
      this.logger.error?.("Bybit WS error", event);
    };

    this.ws.onclose = () => {
      this.logger.info?.("Bybit WS closed");
      this.ws = null;
      this.wsReady = false;
      this.subscriptions.clear();
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.wsReady = false;
      this.subscriptions.clear();
    }
  }
}


