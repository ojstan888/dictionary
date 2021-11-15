#  Dictionary app
## for those, who don't want use copybooks
I learn english and I created this app for me (I use it by myself) and for all who learn languages.

### Frontend: React, Redux, TypeScript
### Backend: Node.js (express), MongoDB

### App is available out here -> https://sheltered-earth-83419.herokuapp.com/


### In this app
1) I've made authorization (by tokens), registration users. Thus you can create your own account.
2) Functionality for cerate/update/delete/search your words.
3) Sserver side pagination for table.
4) The search functionality contains a throttling for search input.
5) Dynamic change routes for user actions
6) Adaptive layout
7) Webpack for frontend (**NOT** create-react-app)

![Запись экрана 2021-11-15 в 12 26 41](https://user-images.githubusercontent.com/59839668/141757170-ff1b6ef8-2461-4961-bb59-01830165b303.gif)

![Запись экрана 2021-11-15 в 12 40 29](https://user-images.githubusercontent.com/59839668/141759072-42c87470-a557-4ebf-ae6f-d6cc9b7d7630.gif)


## Install dependencies

npm install && cd client/ && npm install

## Run dev server
### You can't do that locally, because there is no config database file and secret keys in this public repo

npm run dev

## Build

cd client/ && rm -rf build/ && npm run build && cd .. && npm run start
