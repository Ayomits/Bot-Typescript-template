import { Events, Interaction } from "discord.js";

import { EventStructure } from "../../common/structure/event.structure"; 

export class InteractionCreate extends EventStructure {
  name: string = Events.InteractionCreate;

  async execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands?.get(interaction.commandName);
      try {
        return await command?.execute(interaction);
      } catch (err) {
        console.log(err);
      }
    } else if (
      interaction.isButton() ||
      interaction.isAnySelectMenu() ||
      interaction.isModalSubmit()
    ) {
      const component = interaction.client.buttons?.get(interaction.customId);
      try {
        return component?.execute(interaction);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands?.get(interaction.commandName);
      if (command?.autoComplete) {
        try {
          return await command?.autoComplete(interaction);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}
