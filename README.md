# LT順番決める君

## 主な機能

- 指定されたキーの列をシャッフル
- シャッフル中の音声再生 (Optional)
- 指定されたキーの列を Slack 通知

## 利用方法

- `.env` の中身を適当に変更してください

```
REACT_APP_SLACK_URL=<Incoming Webhook URLのURL>
REACT_APP_SLACK_USERNAME=<Slackのユーザーネーム>
REACT_APP_SLACK_ICON_EMOJI=<Slackのアイコン>
```

- セッション情報は `src/components/ShuffleTable/shuffle.json` の中身に変更してください
- シャッフル中に音声を再生させたい場合は、音声ファイルを `public/shuffle.mp3` という名前で配置してください

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
