const MOBILE_USER_AGENT_PATTERN = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const isMobileUserAgent = (userAgent?: string): boolean => {
  if (typeof userAgent === 'string') {
    return MOBILE_USER_AGENT_PATTERN.test(userAgent);
  }

  if (typeof navigator === 'undefined') {
    return false;
  }

  return MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent);
};

export const isMobileDevice = (): boolean => isMobileUserAgent();
