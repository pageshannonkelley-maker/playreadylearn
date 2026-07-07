import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoredProfiles, saveProfilesToStorage, getProfileLabel } from '../src/profileUtils.js';

test('falls back to legacy child storage when profile storage is missing', () => {
  const storage = {
    getItem(key) {
      if (key === 'prl_profiles') return null;
      if (key === 'prl_children') return JSON.stringify([{ name: 'Maya', profileType: 'child' }]);
      return null;
    },
    setItem() {},
  };

  const profiles = getStoredProfiles(storage);
  assert.equal(profiles.length, 1);
  assert.equal(profiles[0].name, 'Maya');
});

test('saves profiles to both modern and legacy storage keys', () => {
  const values = {};
  const storage = {
    getItem(key) {
      return values[key] ?? null;
    },
    setItem(key, value) {
      values[key] = value;
    },
  };

  saveProfilesToStorage([{ name: 'Noah', profileType: 'student' }], storage);

  assert.equal(values.prl_profiles, '[{"name":"Noah","profileType":"student"}]');
  assert.equal(values.prl_children, '[{"name":"Noah","profileType":"student"}]');
});

test('uses student-friendly labels for teacher-style profiles', () => {
  assert.equal(getProfileLabel('student'), 'Student');
  assert.equal(getProfileLabel('child'), 'Child');
});
