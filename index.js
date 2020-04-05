'use strict';

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message(
  /[ぬヌﾇ][ぅゥｩーｰ]*[るルﾙ][ぅっゥッｩｯーｰ]*([ぽポ]|ﾎﾟ)[ぉっォッｫｩｯーｰ]*/,
  async ({ message, context, say }) => {
    try {
      say(`\`\`\`
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

app.message('海馬', ({ say }) => {
  say('ヽ(*ﾟдﾟ)ノｶｲﾊﾞｰ');
});

app.message(/^(トゥットゥルー|とぅっとぅるー)$/, ({ message, say }) => {
  say(message.text);
});

app.message(/(眠|[ねネﾈ][むムﾑ])[いイｲくクｸ]/, ({ message, say }) => {
  say(`<@${message.user}> もう寝なさい`);
});

app.message(/(寝|眠|[ねネﾈ])[るルﾙ][おオｵぉォｫわワﾜ]?$/, ({ message, say }) => {
  say(`<@${message.user}> おやすみ`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
