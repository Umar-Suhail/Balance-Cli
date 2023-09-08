import { File } from "../modules/file";
import {describe, expect, test} from '@jest/globals';
import { CommandHandler} from "../modules/command_handler";

describe("Test Command Handlers",()=>{
    it("Allocates Stated Funds",()=>{
        CommandHandler.allocate({equity:6000,debt:3000,gold:1000})
        expect(CommandHandler.funds["january"]?.initial.equity).toBe(6000)
        expect(CommandHandler.funds["january"]?.initial.debt).toBe(3000)
        expect(CommandHandler.funds["january"]?.initial.gold).toBe(1000)
    })
    it("Sets Sip Payments",()=>{
        CommandHandler.setSip({equity:2000,debt:1000,gold:500})
        expect(CommandHandler.sip.equity).toBe(2000)
        expect(CommandHandler.sip.debt).toBe(1000)
        expect(CommandHandler.sip.gold).toBe(500)
    })
    it("Applies Change Rates For Given Month",()=>{
        CommandHandler.setChangeRates({january:{equity:4,debt:10,gold:2}})            
        expect(CommandHandler.funds.january?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.january?.postChangeRate?.debt).toBe(3300)
        expect(CommandHandler.funds.january?.postChangeRate?.equity).toBe(6240)
        expect(CommandHandler.funds.january?.postChangeRate?.gold).toBe(1020)
        CommandHandler.setChangeRates({february:{equity:-10,debt:40,gold:0}})
        expect(CommandHandler.funds.february?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.february?.postChangeRate?.debt).toBe(6020)
        expect(CommandHandler.funds.february?.postChangeRate?.equity).toBe(7416)
        expect(CommandHandler.funds.february?.postChangeRate?.gold).toBe(1520)        
        CommandHandler.setChangeRates({march:{equity:12.50,debt:12.50,gold:12.50}})
        expect(CommandHandler.funds.march?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.march?.postChangeRate?.debt).toBe(7897)
        expect(CommandHandler.funds.march?.postChangeRate?.equity).toBe(10593)
        expect(CommandHandler.funds.march?.postChangeRate?.gold).toBe(2272)
        CommandHandler.setChangeRates({april:{equity:8,debt:-3,gold:7}})
        expect(CommandHandler.funds.april?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.april?.postChangeRate?.debt).toBe(8630)	
        expect(CommandHandler.funds.april?.postChangeRate?.equity).toBe(13600)
        expect(CommandHandler.funds.april?.postChangeRate?.gold).toBe(2966)
        CommandHandler.setChangeRates({may:{equity:13,debt:21,gold:10.5}})
        expect(CommandHandler.funds.may?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.may?.postChangeRate?.debt).toBe(11652)
        expect(CommandHandler.funds.may?.postChangeRate?.equity).toBe(17628)
        expect(CommandHandler.funds.may?.postChangeRate?.gold).toBe(3829)
        CommandHandler.setChangeRates({june:{equity:10,debt:8,gold:-5}})
        expect(CommandHandler.funds.june?.postChangeRate?.debt).toBeDefined()
        expect(CommandHandler.funds.june?.postChangeRate?.debt).toBe(13664)
        expect(CommandHandler.funds.june?.postChangeRate?.equity).toBe(21590)
        expect(CommandHandler.funds.june?.postChangeRate?.gold).toBe(4112)        
    })
    it("Prints out balance of given month",()=>{
        const balance = CommandHandler.balance("march")
        expect(balance).toStrictEqual([10593 ,7897, 2272])
    })

    it("Rebalances the funds for latest month",()=>{
        CommandHandler.rebalance()
        expect(CommandHandler.funds[CommandHandler.currentMonth]?.rebalance).toStrictEqual({equity:23619,debt:11809,gold:3936})
    })
    
})