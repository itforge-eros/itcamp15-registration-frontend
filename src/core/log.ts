import {captureMessage} from '@sentry/browser'

const isDev = process.env.NODE_ENV === 'development'

type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'

export function send(level: LogLevel = 'log', ...data: any) {
  try {
    // Only log to console if in development mode!
    if (isDev) {
      console[level](...data)
    }

    // Silently log to FullStory
    if (window.FS) {
      // AdBlock does block FS.log, so we have to check for that!
      if (window.FS.log) {
        window.FS.log(level, ...data)
      }
    }

    // Report errors when level is set to error or warn.
    if (level === 'error' || level === 'warn') {
      captureMessage(data.join(' '))
    }
  } catch (err) {
    console.warn('Logger Error:', err.message)
  }
}

export function debug(...data: any) {
  send('debug', ...data)
}

export function log(...data: any) {
  send('log', ...data)
}

export function info(...data: any) {
  send('info', ...data)
}

export function warn(...data: any) {
  send('warn', ...data)
}

export function error(...data: any) {
  send('error', ...data)
}

export default {send, debug, log, info, warn, error}
