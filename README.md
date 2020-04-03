# siegebot-lfg-2.0

An improvement on the original LFG plugin

Goals of this rewrite:

- Decrease channel clutter by moving many messages to DMs
- Make flow for creating a group less arcane by using a chatbot flow rather than a specific text format (ask specific questions in DMs)
- Allow for support for natural language language parsing ("in three hours", "tomorrow at 5PM EST") using [chrono](https://github.com/wanasit/chrono)
- Back all data with a database for persistence
