const DELETED_PROFILES_KEY = 'mali_samaj_deleted_profiles';

export const getDeletedProfileIdentifiers = (): string[] => {
  try {
    const raw = localStorage.getItem(DELETED_PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const markProfileAsDeleted = (identifiers: (string | undefined | null)[]) => {
  try {
    const existing = getDeletedProfileIdentifiers();
    const valid = identifiers.filter(Boolean) as string[];
    const updated = Array.from(new Set([...existing, ...valid]));
    localStorage.setItem(DELETED_PROFILES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving deleted profile identifiers:', e);
  }
};

export const isProfileDeleted = (p: { id?: string; slug?: string; phone?: string }): boolean => {
  const deletedList = getDeletedProfileIdentifiers();
  if (deletedList.length === 0) return false;
  return Boolean(
    (p.id && deletedList.includes(p.id)) ||
    (p.slug && deletedList.includes(p.slug)) ||
    (p.phone && deletedList.includes(p.phone))
  );
};
