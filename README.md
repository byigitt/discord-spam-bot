# Discord Spam Bot

A Discord User Application that allows you to send spam messages without requiring bot permissions or adding a bot to your guild.

## Features

- Send spam messages using Discord's User Application
- Customizable spam settings
- Embed message support
- Simple and easy-to-use commands

## Prerequisites

- Node.js 16.x or higher
- pnpm package manager
- Discord Account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/byigitt/discord-spam-bot.git
cd discord-spam-bot
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Fill in your Discord token and other required information in the `.env` file.

## Available Commands

- `/spam` - Start spamming messages in a channel
- `/embed` - Send embedded messages
- `/hello` - Test command to verify the bot is working

## Usage

1. Deploy the commands:

```bash
pnpm deploy-commands
```

2. Start the application:

```bash
pnpm start
```

## ⚠️ Disclaimer

This tool is for educational purposes only. Using self-bots or automated user accounts is against Discord's Terms of Service. Use at your own risk.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[byigitt](https://github.com/byigitt)
