import dotenv from 'dotenv';
dotenv.config();

import formatDate from './format-date.js';

const init = async () => {
  try {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚨 A Neon Twin failed',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `Failed: ${formatDate(new Date()).date}`,
            },
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
