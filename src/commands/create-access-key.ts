import {Command, flags} from '@oclif/command';
import * as readline from 'readline';
import * as fs from 'fs';
import * as net from 'net';
import { rawListeners } from 'process';

export default class Bucket extends Command {

  private rl: any;
  private accessKeyFileLocation: string;

  static flags = {
    create: flags.string({char: 'n', description: 'name to print'})
  }

  /**
   *
   *
   * @private
   * @param {*} data
   * @return {*}  {Promise<boolean>}
   * @memberof Bucket
   */
  private async writeAccessKeyPrivateKeyFile(data): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
  
      rl.question('Enter the file name and path to store the private key file -> ', (answer: string) => {
        rl.close();

        if(answer && answer.length > 0) {
          try {
            fs.writeFileSync(answer, data.privateAccessKey);
            this.accessKeyFileLocation = answer;
            resolve(true);

          }
          catch(error) {
            console.error(error);
            resolve(false);

          }
  
        }
        else {
          console.log('Please enter a valid file name and path (UNIX Format /directory/key.pem)');
          this.rl.close();
  
          resolve(false);
        }
      });
    });
  }

  /**
   *
   *
   * @private
   * @param {*} data
   * @return {*}  {Promise<boolean>}
   * @memberof Bucket
   */
  private async writeOutputConfigurationFile(data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
  
      rl.question('Enter the file name and path to store the backup configuration file -> ', (answer: string) => {
        rl.close();

        if(answer && answer.length > 0) {
          try {
            const backupConfiguration = `
              Access Key UID   : ${data.accessKeyUID} \n
              Access Key File  : ${this.accessKeyFileLocation}
            `;

            fs.writeFileSync(answer, backupConfiguration);
            resolve(true);

          }
          catch(error) {
            console.error(error);
            resolve(false);

          }
  
        }
        else {
          console.log('Please enter a valid file name and path (UNIX Format /directory/backup-config.txt)');
          this.rl.close();
  
          resolve(false);
        }
      });
    });
  }

  /**
   *
   *
   * @memberof Bucket
   */
  public async run() {
    if(fs.existsSync('/var/lib/flip-staticStore') && fs.existsSync('/var/lib/flip-staticStore/staticStore.config.json')) {
      const staticStoreConfig = JSON.parse(fs.readFileSync('/var/lib/flip-staticStore/staticStore.config.json').toString());

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Enter description for new key [No Description.] -> ', (answer: string) => {
        console.log('Creating new application key...');

        if(answer.length > 0 && answer !== '') {
          console.log('Using description '+ answer);
        }
        else {
          answer = 'No Description.';
          console.log('Using description ' + answer);
        }
        
        const netClient = net.createConnection({port: 9080}, (client) => {
          console.log('Connected to StaticStore server.');

          netClient.write(JSON.stringify({
            command: 'access-key.create',
            authenticationKey: '1234',
            description: answer
          }));

        });

        netClient.on('data', async (data: any) => {
          try {
            console.log('Response from StaticStore Server.');

            data = JSON.parse(data.toString());
            if(data.status && data.status === 'ok' && data.privateAccessKey) {
              console.log('Access key has been generated.');

              let privateKeyFileWritten = false;
              while(!privateKeyFileWritten) {
                privateKeyFileWritten = await this.writeAccessKeyPrivateKeyFile(data);
              }

              console.log('Private key has been written.');


            }
            else {
              throw 'Could not generate access key. Please check StaticStore server status.';

            }

          }
          catch(error) {
            console.error('There was a problem while making the request to the StaticStore server.');
            throw error;

          }

        });
        netClient.on('end', () => {
          console.log('Connection to StaticStore server has been closed.');
        });


        rl.close();
      });
    }
    else {
      console.error('No configuration target found, run `sudo staticStore set-target <target_ip>` first.');
    }

  }

}