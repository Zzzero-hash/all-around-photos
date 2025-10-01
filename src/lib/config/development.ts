// Development configuration for stubbing database-dependent features

export const isDevelopment = process.env.NODE_ENV === 'development';
export const hasDatabase = process.env.DATABASE_URL !== undefined;

// Feature flags for development
export const developmentConfig = {
  // Use stub repositories when database is not available
  useStubRepositories: isDevelopment && !hasDatabase,
  
  // Enable mock data for galleries and photos
  useMockData: isDevelopment,
  
  // Skip database-dependent validations
  skipDatabaseValidation: !hasDatabase,
  
  // Enable development-only features
  enableDevTools: isDevelopment,
  
  // Mock authentication for development
  mockAuthentication: isDevelopment && !process.env.NEXTAUTH_SECRET
} as const;

export type DevelopmentConfig = typeof developmentConfig;