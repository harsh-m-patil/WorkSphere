/* eslint-disable no-console */
/* eslint-disable no-undef */
import { jest } from '@jest/globals'

global.console = {
  log: jest.fn(), // Disable console.log
  //log: console.log,
  warn: console.warn, // Keep other console methods unchanged
  error: console.error,
  info: console.info,
  debug: console.debug,
}
