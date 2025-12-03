import { appStore } from "./store.js";
import { createSymbol } from "../core/models.js";

export function initializeDemoSymbols() {
  const demo = [
    createSymbol({ id: "BTCUSDT", lastPrice: 100000 }),
    createSymbol({ id: "ETHUSDT", lastPrice: 5000 })
  ];
  appStore.setState({ symbols: demo });
}


