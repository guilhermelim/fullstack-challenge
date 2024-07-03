import { spawn } from "node:child_process";

/**
 * Class to manage services.
 */
class ServiceManager {
  private startCommands: string[];
  private stopCommands: string[];

  /**
   * Constructor for ServiceManager.
   * @param {Array<string>} startCommands - The commands to start the services.
   * @param {Array<string>} stopCommands - The commands to stop the services.
   */
  constructor(startCommands: string[], stopCommands: string[]) {
    this.startCommands = startCommands;
    this.stopCommands = stopCommands;

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.forEach((signal) =>
      process.on(signal, this.handleExit.bind(this))
    );
  }

  /**
   * Executes a command.
   * @param {string} commandLine - The command line to be executed.
   * @returns {Promise<void>} A promise that resolves when the command is successfully executed and rejects when an error occurs.
   */
  executeCommand(commandLine: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Splits the command line into arguments, considering white spaces and handling single and double quotes, allowing escape characters within the quotes.
      const args = commandLine.match(
        /(?:[^\s'"]+|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')+/g
      );
      if (!args) {
        reject(new Error(`Failed to parse command line: ${commandLine}`));
        return;
      }
      const command = args.shift(); // Removes the first element and assigns it to the 'command' variable
      if (!command) {
        reject(new Error(`Empty command found in line: ${commandLine}`));
        return;
      }
      const childProcess = spawn(command, args, { stdio: "inherit" });
      childProcess.on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Failed to execute command with code ${code}`));
        }
      });
    });
  }

  /**
   * Starts the services.
   * @returns {Promise<void>} A promise that resolves when the services are successfully started.
   */
  async startServices(): Promise<void> {
    for (const command of this.startCommands) {
      try {
        await this.executeCommand(command);
      } catch (error: any) {
        this.handleError(`starting services with command ${command}`, error);
      }
    }
  }

  /**
   * Stops the services.
   * @returns {Promise<void>} A promise that resolves when the services are successfully stopped.
   */
  async stopServices(): Promise<void> {
    for (const command of this.stopCommands) {
      try {
        await this.executeCommand(command);
      } catch (error: any) {
        this.handleError(`stopping services with command ${command}`, error);
      }
    }
    process.exit(0);
  }

  /**
   * Handles errors.
   * @param {string} action - The action during which the error occurred.
   * @param {Error} error - The error that occurred.
   */
  private handleError(action: string, error: Error): void {
    console.error(`Error ${action}:`, error);
    process.exit(1);
  }

  /**
   * Handles the process exit.
   * @returns {Promise<void>} A promise that resolves when the exit is successfully handled.
   */
  private async handleExit(): Promise<void> {
    await this.stopServices();
    process.exit(0);
    // Add here any other action you want to perform on exit
  }

  /**
   * Main function to start the services.
   * @returns {Promise<void>} A promise that resolves when all services are successfully started.
   */
  async main(): Promise<void> {
    await this.startServices();
  }
}

const serviceManager = new ServiceManager(
  [
    "npm run services:up",
    'node -e console.log(" ✔ Database container in Docker has started.")',
    'node -e console.log(" ✔ API GraphQL server has started.")',
    "npm run dev",
  ],
  [
    'node -e console.log(" ✔ All services have been terminated.")',
    "npm run services:stop",
  ]
);

serviceManager.main();
