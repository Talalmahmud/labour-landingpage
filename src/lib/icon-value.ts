const CUSTOM_ICON_PREFIX = "custom:";

export function toCustomIconValue(imagePublicId: string): string {
  return `${CUSTOM_ICON_PREFIX}${imagePublicId}`;
}

export function parseCustomIconValue(value: string): string | null {
  return value.startsWith(CUSTOM_ICON_PREFIX) ? value.slice(CUSTOM_ICON_PREFIX.length) : null;
}
