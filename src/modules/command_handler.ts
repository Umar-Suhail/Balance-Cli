enum Month {
    january,
    february,
    march,
    april,
    may,
    june,
    july, 
    august,
    september, 
    october, 
    november, 
    december
}
interface EquityDebtGold {
    equity:number 
    debt:number 
    gold:number
}
interface stages {
    initial:EquityDebtGold
    postSip:EquityDebtGold
    postChangeRate?:EquityDebtGold 
    rebalance?: EquityDebtGold
}
type MonthFundsMap =  {
    [key in keyof typeof Month]?:stages
}
type MonthRateMap = {
    [key in keyof typeof Month]?:EquityDebtGold
}

export class CommandHandler {
    static funds:MonthFundsMap
    static sip:EquityDebtGold 
    static changeRates:MonthRateMap
    static currentMonth: keyof typeof Month = "january"
    static initialInvestmentRatio:EquityDebtGold
    static allocate({equity,debt,gold}:EquityDebtGold){
        this.funds = {...this.funds,january:{initial:{equity,debt,gold},postSip:{equity,debt,gold},postChangeRate:{equity,debt,gold}}}
        this.initialInvestmentRatio = {equity:equity/(equity+debt+gold),debt:debt/(equity+debt+gold),gold:gold/(equity+debt+gold)}
    }
    static setSip({equity,debt,gold}:EquityDebtGold){
        this.sip = {equity,debt,gold} 
    }
    static setChangeRates(changeRates: MonthRateMap){
           const key = Object.keys(changeRates)[0] 
           if(key!="january"){
           this.funds[key] = {}
           this.funds[key].initial = this.funds[this.currentMonth]?.postChangeRate
            }
           const {equity,debt,gold} = this.funds[key].initial
           if(key!="january")
           this.funds[key].postSip = {equity:equity+this.sip.equity,debt:debt+this.sip.debt,gold:gold+this.sip.gold}
           const postSip = this.funds[key].postSip
           this.funds[key].postChangeRate = {equity:Math.floor(postSip.equity+postSip.equity*changeRates[key].equity/100),
           debt:Math.floor(postSip.debt+postSip.debt*changeRates[key].debt/100),
           gold:Math.floor(postSip.gold+postSip.gold*changeRates[key].gold/100)
        }
        this.currentMonth = key as any 
    }
    static balance(month:keyof typeof Month){
        const {equity,debt,gold} = this.funds[month]?.postChangeRate as any 
        console.log(equity,debt,gold)
        return [equity,debt,gold]
    }
    static rebalance(){
        if(this.currentMonth!=="june"&&this.currentMonth!=="december")
            {
                console.log("CANNOT_REBALANCE")
                return false
            }
        const {equity,debt,gold } = this.funds[this.currentMonth]?.postChangeRate as any
        const sum = equity+debt+gold
        this.funds[this.currentMonth as string].rebalance = {equity:Math.floor(sum*this.initialInvestmentRatio.equity),
        debt:Math.floor(sum*this.initialInvestmentRatio.debt),
        gold:Math.floor(sum*this.initialInvestmentRatio.gold)
    }
        this.funds[this.currentMonth as string].rebalance
        console.log(this.funds[this.currentMonth as string].rebalance.equity,this.funds[this.currentMonth as string].rebalance.debt,this.funds[this.currentMonth as string].rebalance.gold)     
    }
}