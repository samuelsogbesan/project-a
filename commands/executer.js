const InvalidCommandError = require("./errors/InvalidCommandError");
const CommandProvider = require("./provider/CommandProvider");

/**
 * Responsible for executing commands.
 * @param {*} command - an object following the command schema.
 * A command is an object with a "command" string and a series of argument/value pairs.
 * @returns true if the command was executed correctly
 * @throws if the command could not be executed.
 */
const executer = async (commandObject) => {
  let command;
  try {
    command = CommandProvider.getCommand(commandObject.command);
  } catch (err) {
    throw new InvalidCommandError(`${commandObject.command} is not a command.`);
  }

  try {
    return await command.run(commandObject.args);
  } catch (err) {
    throw err;
  }
}

module.exports = { executer };
