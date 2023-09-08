import { exit } from "process";
import { CommandHandler } from "./modules/command_handler";
import { File } from "./modules/file";

const filename = process.argv[2];
const data = File.read(filename)
if(!data)
exit()
const commands = File.parse(data)
const handlersMap = {
    'allocate':CommandHandler.allocate,
    'change':CommandHandler.setChangeRates,
    'sip': CommandHandler.setSip,
    'balance':CommandHandler.balance,
    'rebalance':CommandHandler.rebalance
}

commands.forEach(command => {
    handlersMap[command.command](command.params)
});
