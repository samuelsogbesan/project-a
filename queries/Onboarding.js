const { ServerTable, QueueTable } = require("../database/firebase");

/**
 * 
 * @param {*} serverId the id of the server.
 * @param {*} channels an array of channel ids.
 */
const setQueueChannels = async (serverId, channels) => {
  // Add queues to server channel
  for (var i = 0; i < channels.length; i++) {
    let channel = channels[i];
    // False marks a queue channel.
    ServerTable.child(serverId).child(channel).set(false);
  }

  // Create empty reference in QueueTable for later pushes
  QueueTable.child(serverId).set('').catch(err => console.log(err));
}

/**
 * 
 * @param {*} serverId the id of the server
 * @param {*} channels an array of channel ids.
 */
const setInterviewChannels = async (serverId, channels) => {}

module.exports = {

}
