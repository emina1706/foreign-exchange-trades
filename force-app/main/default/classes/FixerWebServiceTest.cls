@isTest
public with sharing class FixerWebServiceTest {
    @isTest static void testCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        
        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        String actualValue = FixerWebService.executeRequest('https://example.com/example/test', 'GET');
        
        String expectedValue = '{"example" : "test"}';
        System.assertEquals(actualValue, expectedValue);
    }
}
