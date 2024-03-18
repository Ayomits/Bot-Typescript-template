import {
  SlashCommandBuilder,
  CommandInteraction,
} from "discord.js";
import { SlashCommandStructure } from "../../common/structure/command.structure";
import { PingService } from "./ping.service";

export class Ping implements SlashCommandStructure {
  data: SlashCommandBuilder;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Пинг бота");
  }

  async execute(interaction: CommandInteraction) {
    const pingService = new PingService(interaction); 

    return pingService.generateEmbed(); 
  }
}