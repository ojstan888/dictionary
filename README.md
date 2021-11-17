#  Dictionary app
## for those, who don't want use copybooks
I learn english and I created this app for me (I use it by myself) and for all who learn languages.

### Frontend: React, Redux, TypeScript
### Backend: Node.js (express), MongoDB

### App is available out here -> https://sheltered-earth-83419.herokuapp.com/


### In this app
1) I've made authorization (by tokens), registration users. Thus you can create your own account.
2) Functionality: cerate/update/delete/search your words.
3) Functionality: create/update/delete tags and bind it to a words
4) Server side pagination for table.
5) The search functionality contains a throttling for search input.
6) Dynamic change routes for user actions
7) Adaptive layout
8) Webpack for frontend (**NOT** create-react-app)

### Account for tests
email: test@mail.com
password: 123456

![Запись экрана 2021-11-18 в 00 15 41](https://user-images.githubusercontent.com/59839668/142284805-41b4edfc-07aa-4d63-b608-1ba9c2fd4741.gif)

![Запись экрана 2021-11-18 в 00 20 14](https://user-images.githubusercontent.com/59839668/142284794-55b50f3f-eb1e-41f1-b0de-02199b30e38c.gif)


## Install dependencies

npm install && cd client/ && npm install

## Run dev server
### You can't do that locally, because there is no config database file and secret keys in this public repo

npm run dev

## Build

cd client/ && rm -rf build/ && npm run build && cd .. && npm run start
