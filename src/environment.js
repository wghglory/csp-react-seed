/**
 * Configure the environment based on the current NODE_ENV and domain
 */
const getEnvironment = () => {
  let env = 'development';

  if (process.env.NODE_ENV === 'production') {
    env = 'staging';
  }

  return env;
};

// Shortcuts
export const isProduction = getEnvironment() === 'production';
export const isStaging = getEnvironment() === 'staging';
export const isDevelopment = !isProduction && !isStaging;

export default getEnvironment;
