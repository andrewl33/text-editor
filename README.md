# TextEdit

CodeShare clone, saves text and shares it with anyone who has the custom url.

## Dev/Watch

MariaDB will need to be installed.

To watch:

In `text-edit-app`, run `npm start`

In `server`, run `npm run dev`

## Testing

To run jest, `react-sane-contenteditable` needs to be modified in the `.babelrc` file from `"modules": false` to `"modules": "commonjs"`. [Issue](https://github.com/ashleyw/react-sane-contenteditable/pull/32).

Make sure to run `yarn install` and `yarn build` to modify exported library.

Run `npm test` for tests.

## Todo

Frontend:

- [ ] Modify/find/do something with PrismJS
- [ ] Handle notification spam
- [ ] Notification animation in buttons
  - [ ] isLoading Reducer
  - [ ] center loading indicator
- [ ] test
- [ ] handle wrong account info in home
- [ ] reject password changes
- [ ] handle user add/del
- [ ] Catch tabs and other kb actions
- [ ] Create right click menu
- [ ] Refactor; Create an errors reducer
  - [ ] Errors reducer handles network errors
  - [ ] Regular errors handle with an alert message
- [ ] move notifications into separate reducer
- [ ] Look through types/index.tsx
- [ ] createAccount route to home
- [ ] verify react-sane-contenteditable.d.ts
- [ ] update react-sane-contenteditable when it is avail

Backend:

- [ ] Test API

* [ ] Deploy
