package org.lamisplus.modules.starter.client;

import org.springframework.http.HttpHeaders;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.MediaType;

import java.util.Arrays;

public class ApiClient {
    public static HttpHeaders getHeaders ()
    {
        String dhis2Credentials = "";
        String encodedCredentials =
                new String(Base64.encodeBase64(dhis2Credentials.getBytes()));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Basic " + encodedCredentials);
        httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }

}
