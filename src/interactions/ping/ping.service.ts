import { CommandInteraction, EmbedBuilder } from "discord.js";

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
        
      );
    return await this.interaction.reply({ embeds: [embed] });
  }

  private calculateMessagePing() {
    return Math.floor((Date.now() - this.interaction.createdTimestamp) / 1000);
  }

  
}
