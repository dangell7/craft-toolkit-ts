// /* eslint-disable node/no-process-env -- needed to find standalone connection */
const HOST = process.env.RIPPLED_HOST ?? '0.0.0.0'
const PORT = process.env.RIPPLED_PORT ?? '6006'
let serverUrl = `ws://${HOST}:${PORT}`
if (process.env.RIPPLED_ENV !== 'standalone') {
  serverUrl = `wss://${HOST}:${PORT}`
}

export default serverUrl
