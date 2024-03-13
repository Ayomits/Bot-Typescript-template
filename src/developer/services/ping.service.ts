import { CommandInteraction, EmbedBuilder } from "discord.js";
import mongoose from "mongoose";

// Example Service for commands

export class PingService {
  readonly interaction: CommandInteraction;

  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
  }

  async generateEmbed() {
    const embed = new EmbedBuilder()
      .setTitle("Проверка задержки бота")
      .addFields(
        {
          name: "Задержка сообщений",
          value: `> ${String(this.calculateMessagePing())}ms`,
          inline: true,
        },
        {
          name: "Задержка вебсокета",
          value: `> ${this.interaction.client.ws.ping}`,
          inline: true,
        },
        {
          name: "Задержка базы данных",
          value: `${await this.calculateDbPing()}ms`,
          inline: true,
        }
      );
    return await this.interaction.reply({ embeds: [embed] });
  }

  private calculateMessagePing() {
    return Math.floor((Date.now() - this.interaction.createdTimestamp) / 1000);
  }

  private async calculateDbPing() {
    let start = Date.now();
    await mongoose.connect(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/TensideLocal",
      {}
    );
    return Math.floor((Date.now() - start) / 1000);
  }
}
