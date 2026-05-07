export function getCurrentTenantSlug(): string | null {
  const parts = window.location.pathname.split("/");

  if (parts[1] !== "t") return null;

  return parts[2];
}