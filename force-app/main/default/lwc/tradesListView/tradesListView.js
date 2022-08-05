import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FIELD_LABEL_SELL_CCY from "@salesforce/label/c.FieldLabel_SellCCY";
import FIELD_LABEL_SELL_AMOUNT from "@salesforce/label/c.FieldLabel_SellAmount";
import FIELD_LABEL_BUY_CCY from "@salesforce/label/c.FieldLabel_BuyCCY";
import FIELD_LABEL_BUY_AMOUNT from "@salesforce/label/c.FieldLabel_BuyAmount";
import FIELD_LABEL_RATE from "@salesforce/label/c.FieldLabel_Rate";
import FIELD_LABEL_DATE_BOOKED from "@salesforce/label/c.FieldLabel_DateBooked";
import FIELD_LABEL_BOOKED_TRADES from "@salesforce/label/c.FieldLabel_BookedTrades";
import BUTTON_LABEL_CREATE from "@salesforce/label/c.ButtonLabel_Create";
import BUTTON_LABEL_CANCEL from "@salesforce/label/c.ButtonLabel_Cancel";
import BUTTON_LABEL_NEW_TRADE from "@salesforce/label/c.ButtonLabel_NewTrade";
import INFO_LABEL_ADDED_NEW_TRADE from "@salesforce/label/c.InfoLabel_NewTradeAdded";
import INFO_LABEL_ERROR_OCCURED from "@salesforce/label/c.InfoLabel_Error";

import getTradesList from "@salesforce/apex/TradesController.getTradesList";
import createTrade from "@salesforce/apex/TradesController.createTrade";
import executeRequest from "@salesforce/apex/FixerWebService.executeRequest";

const columns = [
    {
      label: FIELD_LABEL_SELL_CCY,
      fieldName: "Sell_Currency__c",
      initialWidth: 280,
      hideDefaultActions: true
    },
    {
      label: FIELD_LABEL_SELL_AMOUNT,
      fieldName: "Sell_Amount__c",
      type: "number",
      typeAttributes: {
        step: '0.01',
        minimumFractionDigits: '2', 
        maximumFractionDigits: '2'
      },
      cellAttributes: {
        alignment: 'left'
      },
      hideDefaultActions: true
    },
    {
      label: FIELD_LABEL_BUY_CCY,
      fieldName: "Buy_Currency__c",
      hideDefaultActions: true
    },
    {
      label: FIELD_LABEL_BUY_AMOUNT,
      fieldName: "Buy_Amount__c",
      type: "number",
      sortable: "false",
      typeAttributes: {
        step: '0.01',
        minimumFractionDigits: '2', 
        maximumFractionDigits: '2'
      },
      cellAttributes: {
        alignment: 'left'
      },
      hideDefaultActions: true
    },
    {
      label: FIELD_LABEL_RATE,
      fieldName: "Rate__c",
      type: "number",
      typeAttributes: {
        step: '0.01',
        minimumFractionDigits: '4', 
        maximumFractionDigits: '4'
      },
      cellAttributes: {
        alignment: 'left'
      },
      hideDefaultActions: true
    },
    {
     label: FIELD_LABEL_DATE_BOOKED,
     fieldName: "Date_Booked__c",
     type: "date-locale",
     typeAttributes:{ 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12 : false,     
    },
    hideDefaultActions: true
    }  
  ];

export default class TradesListView extends LightningElement {
    columns = columns;
    newTradeOpened = false;

    sellCurrency;
    buyCurrency;
    sellAmount;
    buyAmount;

    currencies;
    calcullatedRate = 0;

    label = {
        FIELD_LABEL_SELL_CCY,
        FIELD_LABEL_SELL_AMOUNT,
        FIELD_LABEL_BUY_CCY,
        FIELD_LABEL_BUY_AMOUNT,
        FIELD_LABEL_RATE,
        BUTTON_LABEL_CREATE,
        BUTTON_LABEL_CANCEL,
        BUTTON_LABEL_NEW_TRADE,
        FIELD_LABEL_BOOKED_TRADES
    };
    
    @wire(getTradesList)
    trades;
    
    connectedCallback(){
        this.getCurrencies();
    }

    openNewTradeForm(){
        this.newTradeOpened = true;
    }
    closeTradeForm(){
        this.newTradeOpened = false;
    }

    handleChange(event){
        if(event.target.name === "buyCurrency"){
            this.buyCurrency = event.target.value;
        }else if(event.target.name === "sellAmount"){
            this.sellAmount = event.target.value;
        }
        else{
            this.sellCurrency = event.target.value;
        }
        if(this.sellCurrency && this.buyCurrency && this.sellAmount){
            this.executeFixerRequest();
        }
    }

    handleTradeCreation() {
        createTrade({
            sellAmount : this.sellAmount,
            sellCurrency :  this.sellCurrency,
            buyAmount :  this.buyAmount,
            buyCurrency :  this.buyCurrency,
            rate : this.calcullatedRate
        })
          .then(() => {  
            this.dispatchEvent(
              new ShowToastEvent ({
                type: "success",
                title: "Success",
                message: INFO_LABEL_ADDED_NEW_TRADE,
                variant: "success",               
              })
            );
            this.closeTradeForm();
          })
          .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent ({
                  type: "error",
                  title: "Error",
                  message: INFO_LABEL_ERROR_OCCURED,
                  variant: "error",               
                })
              );
          })
          .finally(() => {});
      }
    
    executeFixerRequest(){
        let endpoint = "https://api.apilayer.com/fixer/convert?to="
                        + this.buyCurrency
                        + "&from=" + this.sellCurrency
                        + "&amount="+ this.sellAmount;
        executeRequest({endpoint : endpoint, method : "GET"})
        .then(result => {
            let response = JSON.parse(result);
            if(response.success){
                this.calcullatedRate = response.info.rate;
                this.buyAmount = response.result;
            }
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })    
    }

    getCurrencies(){
        executeRequest({endpoint : 'https://api.apilayer.com/fixer/symbols', method : "GET"})
        .then(result => {
            let response = JSON.parse(result);
            if(response.success){
               let listOfCurrencies = Object.getOwnPropertyNames(response.symbols);
               let formattedList = [];
               for(let i=0; i<listOfCurrencies.length; i++){
                formattedList.push({label:listOfCurrencies[i], value: listOfCurrencies[i]});
               }
               this.currencies = formattedList;
            }
        })
        .catch(error => {
            console.log(error);
        })    
    }   
}