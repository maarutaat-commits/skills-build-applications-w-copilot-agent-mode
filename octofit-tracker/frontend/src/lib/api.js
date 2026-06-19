const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const isCodespaceConfigured = Boolean(codespaceName);

export const apiBaseUrl = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function buildApiUrl(componentName) {
  return `${apiBaseUrl}/${componentName}/`;
}

export function buildApiUrlFromPath(endpointPath) {
  const sanitized = endpointPath.replace(/^\/api\//, '').replace(/^\/+|\/+$/g, '');
  return `${apiBaseUrl}/${sanitized}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchCollection(componentName) {
  const response = await fetch(buildApiUrl(componentName));

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${componentName}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}

export async function fetchCollectionByPath(endpointPath) {
  const response = await fetch(buildApiUrlFromPath(endpointPath));

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${endpointPath}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}