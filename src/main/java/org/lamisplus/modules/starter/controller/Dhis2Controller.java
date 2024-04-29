package org.lamisplus.modules.starter.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.domain.dto.request.UploadDTO;
import org.lamisplus.modules.starter.domain.entity.DataValue;
import org.lamisplus.modules.starter.domain.entity.DataValueSet;
import org.lamisplus.modules.starter.domain.entity.Upload;
import org.lamisplus.modules.starter.service.Dhis2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * LAMISPlus DHIS2 integration
 * Developed by Victor Ajor
 * 24/4/2024
 * **/
@Slf4j
@RestController
@RequestMapping("/v1/dhis2")
@AllArgsConstructor
public class Dhis2Controller {
    @Autowired
    private Dhis2Service dhis2Service;

    @GetMapping("/resources")
    public ResponseEntity<Object> getDhis2Resources() {
        Object resources = dhis2Service.getAllDhis2Resources();
        assert resources != null;
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/data-sets")
    public ResponseEntity<Object> getDataSets() {
        Object resources = dhis2Service.getDhis2DataSets();
        assert resources != null;
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/org-unit")
    public ResponseEntity<Object> getOrgUnits() {
        Object resources = dhis2Service.getDhis2OrgUnits();
        assert resources != null;
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/data-elements")
    public ResponseEntity<Object> getDataElements() {
        Object resources = dhis2Service.getDhis2DataElements();
        assert resources != null;
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/confirm-data-push")
    public ResponseEntity<Object> getDataPushed(
            @RequestParam("orgUnit") String orgUnit,
            @RequestParam("period") String period,
            @RequestParam("dataElement") String dataElement) {
        Object resources = dhis2Service.confirmDataValueSetPushed(orgUnit, period, dataElement);
        if (resources != null) {
            return ResponseEntity.ok(resources);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to confirm data pushed.");
        }
    }

    @PostMapping("/push-data")
    public ResponseEntity<Object> pushAggregateData(@RequestBody DataValueSet dataValues) {
        Object pushedData = dhis2Service.pushData(dataValues);
        return ResponseEntity.ok(pushedData);
    }

    @PostMapping("/dhis2-status-uploads")
    public ResponseEntity<String> saveUploads(@RequestBody Upload uploads){
        dhis2Service.uploadsToDhis2(uploads);
        return ResponseEntity.ok().body("Uploads saved");
    }
    @GetMapping("/dhis2-uploads")
    public ResponseEntity<List<Upload>> getUploads(){
        return ResponseEntity.ok(dhis2Service.getAllUploads());
    }


}
