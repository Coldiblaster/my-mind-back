export {};

declare global {
  interface CustomJwtSessionClaims {
    firstName?: string;
    email?: string;
    professionalId?: string;
  }
}
