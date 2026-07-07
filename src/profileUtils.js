export function getStoredProfiles(storage = globalThis.localStorage) {
  if (!storage) return [];

  try {
    const savedProfiles = storage.getItem("prl_profiles");
    if (savedProfiles) {
      return JSON.parse(savedProfiles);
    }

    const savedChildren = storage.getItem("prl_children");
    return savedChildren ? JSON.parse(savedChildren) : [];
  } catch {
    return [];
  }
}

export function saveProfilesToStorage(profiles, storage = globalThis.localStorage) {
  if (!storage) return;

  try {
    storage.setItem("prl_profiles", JSON.stringify(profiles));
    storage.setItem("prl_children", JSON.stringify(profiles));
  } catch {
    // Ignore storage write failures so the UI remains usable.
  }
}

export function getProfileLabel(profileType = "child") {
  return profileType === "student" ? "Student" : "Child";
}
