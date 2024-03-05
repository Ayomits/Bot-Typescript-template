import { config } from "dotenv";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import EventHandlerService from "./events/system/collectors/event.collector";
import {
  Button,
  SlashCommand,
  Event,
  UserID,
  InviteCode,
  CustomId,
  Intervals,
  GuildID,
  AuditCache,
} from "./base.types";

config();

declare module "discord.js" {
  export interface Client {
    commands?: Collection<string, SlashCommand>;
    buttons?: Collection<CustomId, Button>;
  }
} 

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates,
]; // обычный массив интентов

const client: Client = new Client({ intents: intents }); 

client.commands = new Collection<string, SlashCommand>(); 
client.buttons = new Collection<CustomId, Button>(); 
client.events = new Collection<string, Event>(); 
client.voiceUsers = new Collection<UserID, Intervals>();
client.invites = new Collection<InviteCode, number>(); 
client.auditCache = new Collection<GuildID, AuditCache>();

new EventHandlerService(client); 

client.login(process.env.TOKEN); 
