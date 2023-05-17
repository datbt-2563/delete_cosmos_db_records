const { CosmosClient } = require("@azure/cosmos");
const readlineSync = require('readline-sync');
const { removeUserWithEmail } = require('./remove-user-with-email');
const { removeRichMenu } = require('./remove-rich-menu');
require('dotenv').config()

const endpoint = process.env.END_POINT;
const key = process.env.KEY;
const databaseName = process.env.DATABASE_NAME;
const containerName = process.env.CONTAINER_NAME;

const client = new CosmosClient({ endpoint, key });

async function main() {
    const { database } = await client.databases.createIfNotExists({ id: databaseName });
    const { container } = await database.containers.createIfNotExists({ id: containerName });

    const select = readlineSync.question('Input select remove-user-with-email(1), remove-rich-menu(2):');
    switch (select) {
        case '1':
          await removeUserWithEmail(container);
            break;
        case '2':
          await removeRichMenu(container);
          break;
        default:
            console.log('Invalid input');
    }

    console.log('end');
}

main();
