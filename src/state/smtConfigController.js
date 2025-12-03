import { appStore } from "./store.js";

export function addSmtConfig(config) {
  const existing = appStore.state.smtConfigs || [];
  appStore.setState({ smtConfigs: [...existing, config] });
}

export function setSmtConfigs(configs) {
  appStore.setState({ smtConfigs: configs });
}


