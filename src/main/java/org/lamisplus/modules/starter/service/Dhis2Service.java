package org.lamisplus.modules.starter.service;

import lombok.AllArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.lamisplus.modules.starter.domain.entity.DataValueSet;
import org.lamisplus.modules.starter.domain.entity.Dhis2Configuration;
import org.lamisplus.modules.starter.domain.entity.Upload;
import org.lamisplus.modules.starter.repository.Dhis2ConfigurationRepository;
import org.lamisplus.modules.starter.repository.Dhis2UploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * LAMISPlus DHIS2 integration Service
 * Developed by Victor Ajor
 * 24/4/2024
 * **/

@Service
@AllArgsConstructor
public class Dhis2Service {
    @Autowired
    private Dhis2UploadRepository dhis2UploadRepository;
    @Autowired
    private Dhis2ConfigurationRepository dhis2ConfigurationRepository;
    public static final String DHIS2_SERVICE_URL = "https://dev.hatappr.org/api/";
    private static RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public HttpHeaders getHeaders ()
    {
        List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();

        if (configurations.isEmpty()) {
            throw new RuntimeException("No DHIS2 configurations found");
        }
        Dhis2Configuration config = configurations.get(0);
        String username = config.getUsername();
        String password = config.getPassword();

        String dhis2Credentials = username + ":" + password;
        System.out.println( config.getUrl() );
        String encodedCredentials =
                new String(Base64.encodeBase64(dhis2Credentials.getBytes()));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Basic " + encodedCredentials);
        httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }

    private static void logInfo(String message) {
        System.out.println(message);
    }

    private static void logError(String message, Object response) {
        System.out.println(message);
        System.out.println("Response: " + response);
    }

    public Object pushData(DataValueSet dataValues) {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<Object> httpEntityRequest = new HttpEntity<>(dataValues, httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() + "dataValueSets?dataElementIdScheme=UID&orgUnitIdScheme=UID&importStrategy=NEW_AND_UPDATES",
                    HttpMethod.POST, httpEntityRequest, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Data successfully pushed to DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while pushing data to DHIS2.", responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while pushing data to DHIS2.", e.getMessage());
        }
        return null;
    }

    public Object getAllDhis2Resources() {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() + "resources",
                    HttpMethod.GET, httpEntity, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Data retrieved successfully from DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while retrieving data from DHIS2.", responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while retrieving data from DHIS2.", e.getMessage());
        }
        return null;
    }

    public Object getDhis2DataSets() {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() + "dataSets",
                    HttpMethod.GET, httpEntity, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Data sets retrieved successfully from DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while retrieving data sets from DHIS2.", responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while retrieving data from DHIS2.", e.getMessage());
        }
        return null;
    }

    public Object getDhis2OrgUnits() {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() + "organisationUnits",
                    HttpMethod.GET, httpEntity, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Org Units retrieved successfully from DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while retrieving org Units from DHIS2.",responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while retrieving data from DHIS2.", e.getMessage());
        }
        return null;
    }

    public Object getDhis2DataElements() {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() + "dataElements",
                    HttpMethod.GET, httpEntity, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Data Elements retrieved successfully from DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while retrieving data elements from DHIS2.", responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while retrieving data from DHIS2.", e.getMessage());
        }
        return null;
    }

    public Object confirmDataValueSetPushed(String OrgUnit, String Period, String DataElement) {
        try {
            List<Dhis2Configuration> configurations = dhis2ConfigurationRepository.findAll();
            Dhis2Configuration config = configurations.get(0);
            HttpHeaders httpHeaders = getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(config.getUrl() +"dataValueSets"+"?OrgUnit="+OrgUnit+"&period="+Period+"&dataElement="+DataElement,
                    HttpMethod.GET, httpEntity, Object.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                logInfo("Data Elements confirmed successfully from DHIS2.");
                return responseEntity.getBody();
            }else{
                logError("Error occurred while confirming data elements from DHIS2.", responseEntity.getBody());
            }
        } catch (Exception e) {
            logError("Error occurred while confirming data from DHIS2.", e.getMessage());
        }
        return null;
    }

    public Upload uploadsToDhis2(Upload upload) {
        return dhis2UploadRepository.save(upload);
    }
    public List<Upload> getAllUploads() {
        return dhis2UploadRepository.findAll();
    }

}
