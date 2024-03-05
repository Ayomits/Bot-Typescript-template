import {
  AutocompleteInteraction,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  CommandInteraction,
  GuildAuditLogs,
  Interaction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
} from "discord.js";

export type UserID = string;
export type CustomId = string;
export type InviteCode = string
export type GuildID = string;

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
  autoComplete?: (interaction: AutocompleteInteraction) => void;
}

export interface Button {
  customId: CustomId;
  execute: (
    interaction:
      | ButtonInteraction
      | ModalSubmitInteraction
      | StringSelectMenuInteraction
      | RoleSelectMenuInteraction
      | ChannelSelectMenuInteraction
      | Interaction
  ) => void;
}

export interface Event {
  name: string;
  once: boolean;
  execute: (...args: any) => void;
}

export interface Intervals {
  interval?: NodeJS.Timeout | any;
}

export type AuditCache = GuildAuditLogs<any> | undefined;
