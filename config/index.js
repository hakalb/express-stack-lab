/**
 * Global configurations
 */
export const config = {
  /**
   * Node configurations
   */
  node: {
    /**
     * Production build
     */
    IS_PROD: process.env.NODE_ENV === 'production',
    /**
     * Node server listening port
     */
    PORT: parseInt(process.env.PORT || 8000)
  },
  /*
   * MongoDB configurations
   */
  mongoose: {
    /*
     * MongoDB connection
     */
    MONGOOSE_URI: process.env.MONGOOSE_URI,
    /*
     * Activate mongoose debug mode
     */
    MONGOOSE_DEBUG: process.env.MONGOOSE_DEBUG
  },
  /**
   * Security configurations
   */
  security: {
    /*
     * jwt private secret key - should be atleast XX characters long
     */
    JWT_SECRET: process.env.JWT_SECRET,
    /*
     * jwt time-to-live before expired
     */
    JWT_EXPIRE_IN_SECONDS: parseInt(process.env.JWT_EXPIRE_IN_SECONDS || 0),
    /*
     * Make browser send cookie with jwt only via https
     */
    COOKIE_HTTPS_SECURE: process.env.COOKIE_HTTPS_SECURE === true
  }
};
