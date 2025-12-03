import { appStore } from "./store.js";
import { loadUserSettings, saveUserSettings } from "../utils/storage.js";

const DEFAULT_SETTINGS = {
  version: "1",
  enabledSymbols: [],
  smtConfigs: [],
  alertSoundEnabled: false,
  visualAlertsEnabled: true,
  onlyShowCoinsHittingLevels: false,
  nearHitThreshold: 0.001,
  lastViewedTimeframe: "5m"
};

export function bootstrapUserSettings() {
  const settings = loadUserSettings(DEFAULT_SETTINGS);
  appStore.setState({
    settings,
    smtConfigs: settings.smtConfigs ?? []
  });
}

export function updateUserSettings(patch) {
  const current = appStore.state.settings || DEFAULT_SETTINGS;
  const next = { ...current, ...patch };
  appStore.setState({ settings: next });
  saveUserSettings(next);
}


