# Interview Scheduler

Interview Scheduler is a single page application (SPA)
using the latest tools and techniques, we build and test a **React** application that allows users to book, edit and cancel interview appointments. We combine a concise API with a WebSocket server to build a realtime experience.

## Getting Started

1. Fork [this](https://github.com/EavanK/scheduler) repository, then clone your fork of this repository.

2. Fork [scheduler-api](https://github.com/EavanK/scheduler-api) repository, then clone your fork of scheduler-api repository.

3. Install dependencies using the `npm install` command in both the **scheduler** folder as well as the **scheduler-api** folder.

4. Start the web server using the `npm start` command while in the "scheduler-api" folder. You will also need to start the client by navigating to the root folder and running this `npm start` command there as well. The app will be served at http://localhost:8000/.

5. Go to http://localhost:8000/ in your browser.

## Final Product

**Home page**
![home_page](https://github.com/EavanK/scheduler/blob/master/docs/1_home_page.gif?raw=true)

**Book appointment**
![book_appointment](https://github.com/EavanK/scheduler/blob/master/docs/2_book_appointment.gif?raw=true)

**Edit appointment**
![edit_appointment](https://github.com/EavanK/scheduler/blob/master/docs/3_edit_appointment.gif?raw=true)

**Cancel appointment**
![cancel_appointment](https://github.com/EavanK/scheduler/blob/master/docs/4_cancel_appointment.gif?raw=true)

**Error message**
![error_message](https://github.com/EavanK/scheduler/blob/master/docs/5_error_message.gif?raw=true)

**Realtime communication (WebSocket)**
![realtime_communication](https://github.com/EavanK/scheduler/blob/master/docs/6_realtime_communication.gif?raw=true)

## Running Webpack Development Server

```
npm start
```

## Running Jest Test Framework

```
npm test
```

## Running Storybook Visual Testbed

```
npm run storybook
```

## Running Cypress End-to-End Test

> Make sure [scheduler-api](https://github.com/EavanK/scheduler-api) server is running in test mode with this command

```
cd scheduler-api
npm run test:server
```

> Make sure `scheduler` is running

```
npm run start
```

> type this command to run cypress in `scheduler` directory

```
npm run cypress
```

## Dependencies

- React
- Axios
- react-dom
- classnames
- WebSocket

## devDependencies

- storybook
- @testing-library
- Cypress
- node-sass
- prop-types
- react-test-renderer

## Future Goals

- ~~Replace useState to useReducer~~
- ~~Combine a concise API with a WebSocket server to build a realtime experience~~
- ~~Deploy the server to Heroku~~
- Deply the Client to Netlify
