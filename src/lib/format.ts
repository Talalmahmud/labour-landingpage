export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

function normalizeBdPhoneDigits(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `880${digits.slice(1)}`;
  return digits;
}

export function toTelHref(phone: string): string {
  return `tel:+${normalizeBdPhoneDigits(phone)}`;
}

export function toWhatsAppHref(phone: string): string {
  return `https://wa.me/${normalizeBdPhoneDigits(phone)}`;
}
