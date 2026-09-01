export type AuthUser = {
  email: string;
  role: "admin";
};

export type AuthSession = {
  authenticated: boolean;
  configured: boolean;
  user: AuthUser | null;
};

export type SignInResult =
  | { ok: true; user: AuthUser }
  | { ok: false; reason: "not-configured" | "invalid-credentials" };

/**
 * Temporary authentication boundary.
 *
 * The real implementation will validate credentials on the server and read
 * the session from an HTTP-only cookie once the database is connected.
 */
export function getAuthSession(): AuthSession {
  return {
    authenticated: false,
    configured: false,
    user: null,
  };
}

export function isAdminAuthenticated() {
  return getAuthSession().authenticated;
}

export async function signIn(_email: string, _password: string): Promise<SignInResult> {
  return {
    ok: false,
    reason: "not-configured",
  };
}

export async function signOut() {
  // The server-side session invalidation will be added with the database.
}
