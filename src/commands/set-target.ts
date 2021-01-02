import {Command, flags} from '@oclif/command';
import * as readline from 'readline';
import * as fs from 'fs';

export default class SetTarget extends Command {

  public async run() {
    if(fs.existsSync('/var/lib/flip-staticStore') && fs.existsSync('/var/lib/flip-staticStore/staticStore.config.json')) {
      const staticStoreConfig = JSON.parse(fs.readFileSync('/var/lib/flip-staticStore/staticStore.config.json').toString());
      staticStoreConfig.targetAddress = '127.0.0.1';
      
      fs.writeFileSync('file:/var/lib/flip-staticStore/staticStore.config.json', JSON.stringify(staticStoreConfig));
      console.log('Updated target address.');

    }
    else {
      const staticStoreConfig = {
        targetAddress: '127.0.0.1'
      };

      if(!fs.existsSync('/var/lib/flip-staticStore')) {
        console.log('Creating configuration directory /var/lib/flip-staticStore');
        fs.mkdirSync('/var/lib/flip-staticStore');
        fs.writeFileSync('/var/lib/flip-staticStore/staticStore.config.json', JSON.stringify(staticStoreConfig));
      
      }
      else {
        fs.writeFileSync('/var/lib/flip-staticStore/staticStore.config.json', JSON.stringify(staticStoreConfig));
      }

      console.log('Done.');
    }
  }

}