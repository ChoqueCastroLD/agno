(async () => {
const prompts = require('prompts');
const path = require('path');

const seeders = require('./seeders');

const args = process.argv.slice(2);

const configPath = path.join(process.cwd(), 'agno.config.js');
const config = require(configPath);

// --- main ---
// npx agno (help)
// npx agno init
// npx agno clear

// --- migrations ---
// npx agno migrations (help)
// npx agno migrations list
// npx agno migrations up (<amount>)
// npx agno migrations down (<amount>)
// npx agno migrations run (up|down) <id>
// npx agno migrations init
// npx agno migrations clear
// npx agno migrations create <name>
// npx agno migrations disable <id>
// npx agno migrations enable <id>

// --- seeders ---
// npx agno seeder (help)
// npx agno seeder list
// npx agno seeder init
// npx agno seeder clear
// npx agno seeder run (<table>)

console.log(config);
console.log(args);

throw 'Still in development';

let type;
let seeder_config = './seeders/seeder.config.js';

if(!type)
    type = (await prompts({
        type: 'select',
        name: 'type',
        message: 'What do you want to do?',
        choices: [
            { title: 'Migration', value: 'migration' },
            { title: 'Seeder', value: 'seeder' },
        ],
    })).type;

if (type === 'migration') {
    throw 'Migrations are not supported yet.';
}

if (type === 'seeder') {
    if(!seeder_config)
        seeder_config = (await prompts({
            type: 'text',
            name: 'seeder_config',
            message: 'Where\'s located the seeder config.js file',
        })).seeder_config;
    return await seeders.execute({ config_path: seeder_config })
}

throw 'Invalid options';
})()
.catch(err => console.log(err))
.finally(() => process.exit());
/*
seeders.execute()
.then((inserted) => console.log(`\n\nDatabase Seeded with ${inserted} rows\n\n`))
.catch((err) => console.log("\n\nDatabase Couldnt be seeded, because...\n\n", err, "\n"))
*/