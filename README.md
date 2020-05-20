## firebase 설치

```
npm install -g firebase-tools
```

firebase 툴을 설치한다.

```
firebase login
```

구글로 로그인 합니다.  
로그아웃을 해주고 싶으면

```
firebase logout
```

로그인 실패 시

```
firebase login —interactive
```

firebase init 을 하기전 firebase 사이트에서 사용할 기능을 열여준다 안그러면 오류가 나옴

```
firebase init
```

디렉토리에서 firebase init 을 합니다.

## firebase 초기 설정

public -> init-frebase.js 파일을 만들고 firebase 에서 받은 키를 입력해 줍니다.

```
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

```

## firefunctions 관리자 설정

설정 전 firebase Authentication 에서 구글 로그인을 열어줍니다.

```
cd functions/
npm i
firebase functions:config:set admin.email=abc@google.com
```

등록이 되었는지 확인 방법

```
firebase functions:config:get
```

확인이 완료 되면

```
firebase functions:config:get > .runtimeconfig.json
```

입력해서 json 파일을 만들어 줍니다.  
functions 배포

```
npm run deploy
```

## 시작하기

```
npm i
npm run dev
```

## 배포하기

루트 디렉토리에서

```
firebase deploy
```

_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now deploy --name my-project
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
