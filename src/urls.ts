export type EscapeFn = (value: string) => string;

export function createTaggedString(escapeFn: EscapeFn) {
  return function taggedTemplate(strings: TemplateStringsArray, ...values: unknown[]): string {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        const rawValue = values[i];
        let value: string;
        if (typeof rawValue === "string") {
          value = rawValue;
        } else {
          value = String(rawValue);
        }
        result += escapeFn(value);
      }
    }
    return result;
  };
}

export const urlTemplate = createTaggedString(encodeURIComponent);
