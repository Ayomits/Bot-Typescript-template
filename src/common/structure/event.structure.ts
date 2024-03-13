export class EventStructure {
  name: string = "";
  once: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(..._args: unknown[]) {
    throw new Error("Unsupported operation.");
  }
}
