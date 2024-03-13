import {
  CommandInteraction,
  SlashCommandBuilder,
  AutocompleteInteraction,
} from "discord.js";

export abstract class SlashCommandStructure {
  readonly data: SlashCommandBuilder;

  constructor(data: SlashCommandBuilder) {
    this.data = data;
  }

  abstract execute(interaction: CommandInteraction | any): any;

  abstract autoComplete?(interaction: AutocompleteInteraction | any): any;
}
