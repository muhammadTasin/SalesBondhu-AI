export type UserRole = 'sales_officer' | 'manager' | 'admin';

const ROLE_STORAGE_KEY = 'salesbondhu_user_role';

/**
 * Returns the currently active role from localStorage.
 */
export const getCurrentRole = (): UserRole | null => {
  const role = localStorage.getItem(ROLE_STORAGE_KEY);
  if (role === 'sales_officer' || role === 'manager' || role === 'admin') {
    return role;
  }
  return null;
};

/**
 * Persists the selected user role to localStorage.
 */
export const setCurrentRole = (role: UserRole): void => {
  localStorage.setItem(ROLE_STORAGE_KEY, role);
};

/**
 * Clears the user session role from localStorage.
 */
export const clearSession = (): void => {
  localStorage.removeItem(ROLE_STORAGE_KEY);
};
