const fs = require("fs")

export class File {
    
    static read(fileName){
        if (!fs.existsSync(fileName))
            return false
        return fs.readFileSync(fileName)
         
    }
    static parse(buffer){
        const text = buffer.toString('utf8')
        let commands = text.split('\r\n')
        return commands.map((command)=>{
            let commandParams = command.split(' ')
            if(commandParams.length==1)
                return {
                    command: commandParams[0].toLowerCase(),
                    params:{}
                } 
            if(commandParams[0]=="CHANGE"){
                return {
                    command: commandParams[0].toLowerCase(),
                    params: {[commandParams[4].toLowerCase()]:{
                        equity: parseFloat(commandParams[1].replace('%','')),
                        debt: parseFloat(commandParams[2].replace('%','')),
                        gold: parseFloat(commandParams[3].replace('%','')),
                    }}
                }
                
            }
            if(commandParams[0]=="BALANCE")
            return {
                command: commandParams[0].toLowerCase(),
                params:commandParams[1].toLowerCase()
            }
            return {
                command: commandParams[0].toLowerCase(),
                params: {
                        equity: parseInt(commandParams[1]),
                        debt: parseInt(commandParams[2]),
                        gold: parseInt(commandParams[3]),
                }
            }  
        })
    }
}