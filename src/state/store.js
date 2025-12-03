import { BybitClient } from "../api/bybitClient.js";

class AppStore {
  constructor() {
    this.state = {
      symbols: [],
      keyLevelsBySymbol: {},
      settings: {},
      smtConfigs: [],
      smtEvents: [],
      connection: {
        wsConnected: false,
        lastMessageAt: null
      }
    };
    this.listeners = new Set();
    this.bybitClient = new BybitClient({});
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const appStore = new AppStore();


