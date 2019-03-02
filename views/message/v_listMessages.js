'use strict'

const messageView = require('./v_message')

/**
 * @param {Array} msgObjects array with message data objects
 */
const getListMsgView = (hostname, msgObjects) =>
    msgObjects.map(
        obj => messageView.getMessageView(hostname, obj)
    )

module.exports = { getListMsgView }
