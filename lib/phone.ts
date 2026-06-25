export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function formatUsPhoneInput(value: string): string {
  const digits = digitsOnly(value).slice(0, 10);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length < 4) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidUsPhone(value: string): boolean {
  return digitsOnly(value).length === 10;
}
