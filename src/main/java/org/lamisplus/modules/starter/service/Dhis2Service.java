package org.lamisplus.modules.starter.service;

import lombok.AllArgsConstructor;
import org.lamisplus.modules.starter.client.ApiClient;
import org.lamisplus.modules.starter.domain.dto.request.UploadDTO;
import org.lamisplus.modules.starter.domain.entity.DataValueSet;
import org.lamisplus.modules.starter.domain.entity.Upload;
import org.lamisplus.modules.starter.repository.Dhis2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.swing.text.html.Option;
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
    private static ApiClient apiClient;
    @Autowired
    private Dhis2Repository dhis2Repository;
    public static final String DHIS2_SERVICE_URL = "https://dev.hatappr.org/api/";

    private static RestTemplate restTemplate() {
        return new RestTemplate();
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
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<Object> httpEntityRequest = new HttpEntity<>(dataValues, httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL + "dataValueSets?dataElementIdScheme=UID&orgUnitIdScheme=UID&importStrategy=NEW_AND_UPDATES",
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

    public static Object getAllDhis2Resources() {
        try {
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL + "resources",
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

    public static Object getDhis2DataSets() {
        try {
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL + "dataSets",
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

    public static Object getDhis2OrgUnits() {
        try {
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL + "organisationUnits",
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

    public static Object getDhis2DataElements() {
        try {
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL + "dataElements",
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

    public static Object confirmDataValueSetPushed(String OrgUnit, String Period, String DataElement) {
        try {
            HttpHeaders httpHeaders = ApiClient.getHeaders();

            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<Object> responseEntity = restTemplate().exchange(DHIS2_SERVICE_URL+"dataValueSets"+"?OrgUnit="+OrgUnit+"&period="+Period+"&dataElement="+DataElement,
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
        return dhis2Repository.save(upload);
    }
    public List<Upload> getAllUploads() {
        return dhis2Repository.findAll();
    }

}
