#### LOCAL SETUP

For local setup, I have docker installed and I just run `docker compose -f ./src/config/redis-docker-config.yaml up -` which runs my redis DB server in the background. For storage, I use mongodb which can be started using `sudo systemctl start mongod`.
Once both are up, I just run `npm run dev` which runs a nodemon server which compiles and runs the typescript code.


#### DEPLOYMENT
Maybe I will host this on AWS but I need to understand the costs behind running a server that barely gets any request but is still up indefinitely.
