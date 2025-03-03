export function getFormValue<T>(
  formEvent: React.FormEvent<HTMLFormElement>,
  value: string
) {
  const element = formEvent.currentTarget.elements.namedItem(
    value
  ) as HTMLInputElement;
  return element.value as T;
}
