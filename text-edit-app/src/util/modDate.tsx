export default function dateStringToMMDDYYYY(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
}
