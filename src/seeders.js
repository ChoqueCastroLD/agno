console.log("Initializing seeders")

const cliProgress = require('cli-progress');
const path = require('path');

async function execute(options) {
  const configPath = path.join(process.cwd(), options.config_path);
  const config = require(configPath);
  
  console.log(`Seeding table${config.tables.length !== 0 ? 's' : ''}: \n`);
  
  let count = 0;
  for (const {table, data} of config.tables()) {
    const bar = new cliProgress.SingleBar({
      format: `${table.padEnd(12)}\t{bar} || {percentage}% || {value}/{total}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591'
    }, cliProgress.Presets.shades_grey);
    bar.start(data.length, 0);
    
    if(Array.isArray(data)) {
      for (const obj of data) {
        await Promise.resolve(config.process({table, data: obj}));
        count++;
        bar.increment();
      }
    } else {
      await Promise.resolve(config.process({table, data}));
      count++;
      bar.increment();
    }
    
    bar.stop();
  }
  return count;
}
module.exports = {
    execute
}
