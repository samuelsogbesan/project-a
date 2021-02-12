const { SessionTable } = require("../database/firebase")
const { useRoom } = require("./Server")

/**
 * Returns whether an interview channel is current being used for interview.
 * @param {*} channelID 
 */
const isInterviewInSession = (channelId) => {

}

/**
 * Returns whether the channel is being used as a queue channel.
 */
const isQueueChannel = (serverId, channelId) => {

}

/**
 * Returns whether the channel is an interview channel.
 * @param {*} serverId 
 * @param {*} channelId 
 */
const isInterviewChannel = (serverId, channelId) => {

}

/**
 * Starts an interview session in the channel with channelId between user1 and user2.
 * @param {*} channelId 
 * @param {*} user1 
 * @param {*} user2 
 * @returns the session data if successful.
 * @throws if the given channel is not an interview channel.
 */
const startInterviewSession = (channelId, user1, user2) => {

}

/**
 * Start an interview session in any free interview channel.
 * @param {*} serverId the id of the server to query.
 * @param {*} user1
 * @param {*} user2
 * @returns the session data if successful.
 * @throws if there are no free interview channels.
 */
const startInterviewSessionAnywhere = async (serverId, user1, user2) => {

  // Gets the rooms that are currently free
  let room;
  try {
    room = await getAnyFreeRoom(serverId);
  } catch (err) {
    console.error('A room could not be found');
    return err;
  }

  // Grab a reference to the table we want to manipulate
  const sessionReference = SessionTable.child(room);

  // Make sure no session currently exists
  const currentSession = await sessionReference.get();
  if (!currentSession.exists()) {

    // Grab the expiration date stamp.
    const creationDate = new Date();
    creationDate.setHours(creationDate.getHours() + 1);
    const expirationTimestamp = + creationDate; // (+ Date is a hack to get the timestamp)

    // Grab a random question from the database.
    const question = await getRandomQuestion();

    // Create a session in the database for this room.
    await sessionReference.set({
      users: [user1, user2],
      question: question,
      expiration: expirationTimestamp
    });

    // Mark the room as used.
    useRoom(firstFreeRoom);

    return true;
  } else {
    return new Error('The Session Already Exists in the database');
  }
}

/**
 * If occupied, this ends an interview in channel with channelId.
 * @param {*} channelId 
 */
const endInterviewSession = (channelId) => {

}

/**
 * If occupied, returns the session data for a given interview channel.
 * If no interview is in progress, returns undefined.
 * @param {*} channelId 
 */
const getSession = (channelId) => {

}