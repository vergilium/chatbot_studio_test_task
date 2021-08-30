// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}../.env` });

const config = {
    server: {
        port: 8081
    }
};

export default config;
