const normalizeEnvValue = (value) => {
  if (!value) return '';
  const trimmed = value.trim();
  if (trimmed === 'undefined' || trimmed === 'null') return '';
  return trimmed;
};

const detectCodespaceNameFromHost = () => {
  if (typeof window === 'undefined') return '';

  const host = window.location.hostname;
  const match = host.match(/^(.+)-\d+\.app\.github\.dev$/);
  return match?.[1] ?? '';
};

const envCodespaceName = normalizeEnvValue(import.meta.env.VITE_CODESPACE_NAME);
const detectedCodespaceName = detectCodespaceNameFromHost();
const codespaceName = envCodespaceName || detectedCodespaceName;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const getApiUrl = (resource) => `${apiBaseUrl}/${resource}/`;

export const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
};
