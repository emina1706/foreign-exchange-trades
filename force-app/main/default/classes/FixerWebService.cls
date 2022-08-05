global class FixerWebService {
  @AuraEnabled
   global static String executeRequest(String endpoint, String method){
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endpoint);
    req.setMethod(method);
    req.setHeader('apikey', 'dykA6eG6DDh5JXYCSYSvmmiInXxE8mdu');
 
    Http http = new Http();
    HTTPResponse res = http.send(req);
    return res.getBody();
   }
}
