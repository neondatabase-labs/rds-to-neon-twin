import dotenv from 'dotenv';
dotenv.config();

import formatDate from './format-date.js';

const init = async () => {
  const bytes = parseInt(process.env.DATABASE_SIZE, 10) || 0;
  const gigabytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);
  const name = process.env.DATABASE_NAME || 'undefined';
  const start = new Date(process.env.JOB_START_TIME) || new Date();
  const end = new Date(process.env.JOB_END_TIME) || new Date();
  const duration = end - start;
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

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
              text: '☝️ A new Neon Twin is available!',
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
              text: `Created: ${formatDate(start).date}`,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `• Size: ${gigabytes} GB\n• Name: ${name}\n• Start: ${formatDate(start).time}\n• End: ${
                  formatDate(end).time
                }\n• Duration: ${hours} hours, ${minutes} minutes, ${seconds} seconds\n`,
              },
            ],
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
