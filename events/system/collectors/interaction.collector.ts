import { Button } from "../../../base.types";
import { Client, Collection } from "discord.js";
import * as path from "path";
import * as fs from "fs";

export default class InteractionCollector extends Collection<string, Button> {
  readonly client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
    this.collect()
  }

  public async collect() {
    const pathToInteractions = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "interactions"
    );
    const collectedCategoryTags: string[] = ["buttons", "modals", "selects"];

    fs.readdirSync(pathToInteractions).forEach((dir) => {
      const interactionCategoryPath = path.join(pathToInteractions, dir);
      fs.readdirSync(interactionCategoryPath).forEach((dir_) => {
        if (collectedCategoryTags.includes(dir_)) {
          const interactionPath = path.join(interactionCategoryPath, dir_);
          fs.readdirSync(interactionPath).forEach((file) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const ComponentClass = require(interactionPath + `/${file}`);
            const component = new ComponentClass[
              Object.keys(ComponentClass)[0]
            ]();
            this.client.buttons?.set(component.customId, component);
          });
        }

        if (dir_.includes("command")) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const CommandClass = require(interactionCategoryPath + `/${dir_}`);
          const command = new CommandClass[Object.keys(CommandClass)[0]]();

          this.client.commands?.set(command.data.name, command);
        }
      });
    });
  }
}
