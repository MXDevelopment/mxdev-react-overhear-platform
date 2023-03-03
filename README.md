# Overhear Platform

Deployment of the Overhear Platform through React for launch to all platforms in  2023

# Dependencies & Libraries

| Tag               | Group                | Version | Description                                       |
|-------------------|----------------------|---------|---------------------------------------------------|
| React Native      | Mobile Framework     | v0.70   | The best cross-platform mobile framework / Stable |
| React             | UI Framework         | v18     | The most popular UI framework in the world        |
| TypeScript        | Language             | v4      | Static typechecking                               |
| React Navigation  | Navigation           | v6      | Performant and consistent navigation framework    |
| MobX-State-Tree   | State Management     | v5      | Observable state tree                             |
| MobX-React-Lite   | React Integration    | v3      | Re-render React performantly                      |
| Expo              | SDK                  | v47     | Allows (optional) Expo modules                    |
| Expo Font         | Custom Fonts         | v10     | Import custom fonts                               |
| Expo Localization | Internationalization | v13     | i18n support (including RTL!)                     |
| Expo Status Bar   | Status Bar Library   | v1      | Status bar support                                |
| RN Reanimated     | Animations           | v2      | Beautiful and performant animations               |
| AsyncStorage      | Persistence          | v1      | State persistence                                 |
| apisauce          | REST client          | v2      | Communicate with back-end                         |
| Flipper           | Debugger             |         | Native debugging                                  |
| Reactotron RN     | Inspector/Debugger   | v2      | JS debugging                                      |
| Hermes            | JS engine            |         | Fine-tuned JS engine for RN                       |
| Jest              | Test Runner          | v26     | Standard test runner for JS apps                  |
| Detox             | Testing Framework    | v19     | Graybox end-to-end testing                        |
| date-fns          | Date library         | v2      | Excellent date library                            |

## Directory Structure

The Initial Structure of the Repository is structured as follows

```
ignite-project
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   ├── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── .env
└── package.json

```
## Guide to Directory Structure

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Detox end-to-end tests

Read [Detox setup instructions](./detox/README.md).


