'use strict'

const webhookView = require('./v_webhook')

/**
 * @param {Array} hooks - webhook data objects
 */
const getListHooksView = (hostname, hooks) =>
  hooks.map(
    hook => webhookView.getWebhookView(hostname, hook)
  )

module.exports = { getListHooksView }
