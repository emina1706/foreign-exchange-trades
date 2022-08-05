@IsTest
public with sharing class TradesControllerTest {
    @IsTest
    static void testIfTradeCreated() {
      //Arrange
      Decimal sellAmount = 100.00;
      String sellCurrency = 'BAM';
      Decimal buyAmount = 100.00;
      String buyCurrency = 'BAM';
      Decimal rate = 1.0000;

      //Act
      TradesController.createTrade(sellAmount, sellCurrency, buyAmount, buyCurrency, rate);
      List<Trade__c> insertedTrades = [SELECT Sell_Amount__c FROM Trade__c WHERE Sell_Amount__c = 100.00];

      //Assert
      System.assertEquals(true, insertedTrades.size() > 0);
    }
  
    @isTest
    static void testTradeSelector(){
       //Arrange
       Trade__c testTrade = new Trade__c();
       insert testTrade;
 
       //Act
       List<Trade__c> tradesList = TradesController.getTradesList();
       
       //Assert
       System.assertEquals(true, tradesList.size() > 0);
    }
}
