## Install dependencies

npm install && cd client/ && npm install

## Run dev server
### You can't do that locally, because there is no config database file and secret keys in this public repo

npm run dev

## Build

cd client/ && rm -rf build/ && npm run build && cd .. && npm run start
