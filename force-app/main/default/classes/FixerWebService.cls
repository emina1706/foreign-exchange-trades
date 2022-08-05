global class FixerWebService {
  @AuraEnabled
   global static String executeRequest(String endpoint, String method){
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endpoint);
    req.setMethod(method);
    req.setHeader('apikey', 'YLf9r24jXDrcBZaSf9Md61YIqY7QMQYk');
 
    Http http = new Http();
    HTTPResponse res = http.send(req);
    return res.getBody();
   }
}
