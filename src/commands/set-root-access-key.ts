import Command from '@oclif/command';
import * as fs from 'fs';
import * as readline from 'readline';

export default class SetRootAccessKeyCommand extends Command {

  /**
   *
   *
   * @private
   * @return {*}  {Promise<boolean>}
   * @memberof SetAccessKeyCommand
   */
  private async setRootAccessKeyUID(): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(async (resolve, reject) => {
      try {
        rl.question('Enter Root Access Key UID for target server -> ', (answer: string) => {
          if(answer && answer.length > 0) {
            console.log('Writing route access key UID to configuration.');

            // load configuration, and set changes & save.
            const configuration = JSON.parse(fs.readFileSync('/var/lib/flip-staticStore/staticStore.config.json').toString());

            if(configuration.accessKeyUID) {
              console.log('Updating existing access key UID.');
            }
            else {
              console.log('Setting access key UID for the first time.');
            }

            configuration.accessKeyUID = answer;
            fs.writeFileSync('/var/lib/flip-staticStore/staticStore.config.json', JSON.stringify(configuration));
            resolve(true);
    
          }
          else {
            console.error('Please enter a valid root access key UID');
            resolve (false);
          }
        });
      }
      catch(error) {
        console.log('Error while setting root access key UID: ');
        throw error;

      }
    })
  }

  /**
   *
   *
   * @private
   * @return {*}  {Promise<boolean>}
   * @memberof SetRootAccessKeyCommand
   */
  private async setRootAccessPrivateKeyFileLocation(): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(async (resolve, reject) => {
      try {
        rl.question('Enter Root Access Key PEM file location for target server -> ', (answer: string) => {
          if(answer && answer.length > 0) {
            console.log('Writing route access key PEM file location to configuration.');

            // load configuration, and set changes & save.
            const configuration = JSON.parse(fs.readFileSync('/var/lib/flip-staticStore/staticStore.config.json').toString());

            if(configuration.accessKeyPemFileLocation) {
              console.log('Updating existing access key pem file location.');
            }
            else {
              console.log('Setting access key pem file location for the first time.');
            }

            configuration.accessKeyPemFileLocation = answer;
            fs.writeFileSync('/var/lib/flip-staticStore/staticStore.config.json', JSON.stringify(configuration));
            resolve(true);
    
          }
          else {
            console.error('Please enter a valid root access key pem file location in UNIX format [/directory/keyFile.pem]');
            resolve (false);
          }
        });
      }
      catch(error) {
        console.log('Error while setting root access key pem file location.: ');
        throw error;

      }
    })
  }

  /**
   *
   *
   * @memberof SetAccessKeyCommand
   */
  async run() {
    if(fs.existsSync('/var/lib/flip-staticStore') && fs.existsSync('/var/lib/flip-staticStore/staticStore.config.json')) {

      let rootAccessKeyWritten = false;
      while(!rootAccessKeyWritten) {
       rootAccessKeyWritten = await this.setRootAccessKeyUID();
      }

      let rootAccessKeyPemFileWritten = false;
      while(!rootAccessKeyPemFileWritten) {
       rootAccessKeyPemFileWritten = await this.setRootAccessPrivateKeyFileLocation();
      }

      console.log('Completed all changes to configuration.');
      return;

    }
    else {
      console.error('No configuration target or file found, run `sudo staticStore set-target <target_ip>` first.');
    }
  }

}