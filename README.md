# TextEdit

CodeShare clone, saves text and shares it with anyone who has the custom url.

## Dev/Watch

PostgreSQL, will need to be installed.

To watch:

In `text-edit-app`, run `npm start` 

In `server`, run `nodemon` 

## Testing
 Package `react-sane-contenteditable` needs to be modified in the `.babelrc` file from `"modules": false` to `"modules": "commonjs"`. [Issue](https://github.com/ashleyw/react-sane-contenteditable/pull/32).

Make sure to run `yarn install` and `yarn build ` to modify exported library.

Run `npm test` for tests.

## Todo
- [ ] Testing
- [ ] Copy to clipboard
- [ ] Modify/find/do something with PrismJS
- [ ] Authentication
- [ ] Notification pop-ups
- [ ] Notification animation
- [ ] Deploy
