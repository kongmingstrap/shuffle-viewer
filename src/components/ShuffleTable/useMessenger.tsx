export interface UseMessengerInterface {
  sendMessage: (rows: string[][], index: number) => void
}

export const useMessenger = (): UseMessengerInterface => {
  const sendMessage = async (rows: string[][], index: number) => {
    for (const val of rows) {
      await fetch(
        process.env.REACT_APP_SLACK_URL ?? '', {
          method: `POST`,
          body: JSON.stringify({
            username: process.env.REACT_APP_SLACK_USERNAME ?? '',
            text: `${val[index]} さん雑談スレ`,
            icon_emoji: process.env.REACT_APP_SLACK_ICON_EMOJI ?? ''
          })
        }
      )
    }
  }

  return {
    sendMessage
  }
}
