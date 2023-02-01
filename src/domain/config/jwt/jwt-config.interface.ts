export interface JwtConfigInterface {
  getJwtSecret(): string;
  getJwtRefreshToken(): string;
  getExpiresIn(): number;
  getJwtRefreshTokenExpirationTime(): number;
}
