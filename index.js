const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function getStrategy(coin) {
  const price = (Math.random()*10000 + 30000).toFixed(0);
  return `【${coin.toUpperCase()}策略建议】
📈 当前趋势：震荡偏强
🎯 开仓建议：${price-500} - ${price}
🚀 止盈目标：${+price + 2000}
💣 止损建议：${+price - 2000}
🧠 简单策略逻辑演示`;
}

// 接收 /start 指令，弹出菜单
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '欢迎使用「币圈谋士AI」，请选择要查看的币种策略👇', {
    reply_markup: {
      keyboard: [
        ['📈 BTC', '🔥 ETH'],
        ['💎 VIP套餐']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

// 响应按钮点击或指令
bot.on('message', (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === '📈 BTC' || text === '/btc') {
    return bot.sendMessage(chatId, getStrategy('BTC'));
  }

  if (text === '🔥 ETH' || text === '/eth') {
    return bot.sendMessage(chatId, getStrategy('ETH'));
  }

  if (text === '💎 VIP套餐' || text === '/vip') {
    return bot.sendMessage(chatId,
      `🎁 VIP套餐说明：
- 免费试用1天
- 月卡：29元
- 季卡：69元
- 年卡：199元
- 永久卡：499元`);
  }
});
