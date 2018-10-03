# TextEdit

CodeShare clone, saves text and shares it with anyone who has the custom url.

## Dev/Watch

PostgreSQL, will need to be installed.

To watch:

In `text-edit-app`, run `npm start` 

In `server`, run `nodemon` 

## Testing
 To run jest, `react-sane-contenteditable` needs to be modified in the `.babelrc` file from `"modules": false` to `"modules": "commonjs"`. [Issue](https://github.com/ashleyw/react-sane-contenteditable/pull/32).

Make sure to run `yarn install` and `yarn build ` to modify exported library.

Run `npm test` for tests.

## Todo
- [X] Testing
- [X] Copy to clipboard
- [ ] Modify/find/do something with PrismJS
- [ ] Authentication
- [X] Notification pop-ups
- [ ] Handle notification spam
- [ ] Notification animation in buttons
- [ ] Deploy
- [x] Remove ORM 