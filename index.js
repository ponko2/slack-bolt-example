'use strict';

const { App } = require('@slack/bolt');

const app = new App({
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message(
  /[ぬヌﾇ][ぅゥｩーｰ]*[るルﾙ][ぅっゥッｩｯーｰ]*([ぽポ]|ﾎﾟ)[ぉっォッｫｩｯーｰ]*/,
  async ({ message, context, say }) => {
    try {
      await say(`\`\`\`
   Λ＿Λ     ＼＼
（  ・∀・）  | | ｶﾞｯ
 と     ）  | |
  Ｙ /ノ     人
   / ）    < >   _Λ  ∩
＿/し'   ／／  Ｖ｀Д´）/
（＿フ彡             / ←>> <@${message.user}>
\`\`\``);
      await app.client.reactions.add({
        token: context.botToken,
        name: 'hammer',
        channel: message.channel,
        timestamp: message.ts,
      });
    } catch (err) {
      console.error('Failed to add emoji reaction :(', err);
    }
  }
);

app.message('海馬', async ({ say }) => {
  await say('ヽ(*ﾟдﾟ)ノｶｲﾊﾞｰ');
});

app.message(/^(トゥットゥルー|とぅっとぅるー)$/, async ({ message, say }) => {
  await say(message.text);
});

app.message(/(眠|[ねネﾈ][むムﾑ])[いイｲくクｸ]/, async ({ message, say }) => {
  await say(`<@${message.user}> もう寝なさい`);
});

app.message(
  /(寝|眠|[ねネﾈ])[るルﾙ][おオｵぉォｫわワﾜ]?$/,
  async ({ message, say }) => {
    await say(`<@${message.user}> おやすみ`);
  }
);

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();
