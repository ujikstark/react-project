

export function route(
  path: string,
  parts: Record<string, unknown> = {}
): string {
  let url = path;

  for (const part in parts) {
    url = url.replace(`:${part}`, parts[part] as string);
  }

  return url;
}
