const isProd = import.meta.env.PROD;

export function redactSensitive(data: any): any {
  if (typeof data === 'string') {
    let redacted = data;
    redacted = redacted.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL REDACTED]');
    redacted = redacted.replace(/(?:\+88|88)?(01[3-9]\d{8})/g, '[PHONE REDACTED]');
    redacted = redacted.replace(/(sk-[a-zA-Z0-9]{20,})/g, '[API_KEY REDACTED]');
    redacted = redacted.replace(/(AIza[0-9A-Za-z-_]{35})/g, '[API_KEY REDACTED]');
    redacted = redacted.replace(/Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*/gi, 'Bearer [TOKEN REDACTED]');
    return redacted;
  }
  
  if (data !== null && typeof data === 'object') {
    const redactedObj: any = Array.isArray(data) ? [] : {};
    for (const key in data) {
      if (
        key.toLowerCase().includes('password') ||
        key.toLowerCase().includes('token') ||
        key.toLowerCase().includes('secret') ||
        key.toLowerCase().includes('service_role') ||
        key.toLowerCase().includes('otp')
      ) {
        redactedObj[key] = '[REDACTED]';
      } else if (key.toLowerCase() === 'lat' || key.toLowerCase() === 'lng' || key.toLowerCase() === 'latitude' || key.toLowerCase() === 'longitude') {
        redactedObj[key] = '[GPS REDACTED]';
      } else {
        redactedObj[key] = redactSensitive(data[key]);
      }
    }
    return redactedObj;
  }
  
  return data;
}

export function safeLog(...args: any[]) {
  if (!isProd) {
    console.log(...args.map(redactSensitive));
  }
}

export function safeWarn(...args: any[]) {
  console.warn(...args.map(redactSensitive));
}

export function safeError(...args: any[]) {
  console.error(...args.map(redactSensitive));
}
