public with sharing class TradesController {

    @AuraEnabled(cacheable=true)
    public static List<Trade__c> getTradesList() {
        return [SELECT Id, Sell_Currency__c, Sell_Amount__c, Buy_Currency__c, Buy_Amount__c, Rate__c, Date_Booked__c FROM Trade__c LIMIT 50];
    }
  
    @AuraEnabled
    public static void createTrade(Decimal sellAmount, String sellCurrency, Decimal buyAmount, String buyCurrency, Decimal rate) {
        Trade__c trade = new Trade__c(); 

        trade.Sell_Amount__c =  sellAmount;
        trade.Sell_Currency__c =  sellCurrency;
        trade.Buy_Amount__c =  buyAmount;
        trade.Buy_Currency__c =  buyCurrency;
        trade.Rate__c = rate;
        trade.Date_Booked__c = System.now();

        insert trade; 
    }
}
