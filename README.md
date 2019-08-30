# TextEdit

CodeShare clone, saves text and shares it with anyone who has the custom url.

## Dev/Watch

MariaDB will need to be installed.

To watch:

In `text-edit-app`, run `npm start`

In `server`, run `npm run dev`

## Testing

Run `npm run test` for tests.

## Todo

Frontend:

- [ ] Slowly make ts more strict
- [ ] Add branch that save to browser storage

- [ ] Handle notification spam
- [ ] Notification animation in buttons
  - [ ] isLoading Reducer
  - [ ] center loading indicator
- [ ] handle wrong account info in home
- [ ] reject password changes
- [ ] Create right click menu
- [ ] Refactor; Create an errors reducer
  - [ ] Errors reducer handles network errors
  - [ ] Regular errors handle with an alert message
- [ ] move notifications into separate reducer
- [ ] Look through types/index.tsx

Backend:

- [ ] Test API


