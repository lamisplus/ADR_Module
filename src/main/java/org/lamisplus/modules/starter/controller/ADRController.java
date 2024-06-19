package org.lamisplus.modules.starter.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.domain.dto.ADRRequest;
import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.lamisplus.modules.starter.domain.dto.ApiResponse;
import org.lamisplus.modules.starter.domain.dto.PatientDetails;
import org.lamisplus.modules.starter.service.ADRService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/adr")
public class ADRController {

    private final ADRService adrService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createADR(@Valid @RequestBody ADRRequest request){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.createADR(request));
    }

    @GetMapping("/adr/patient/{patientUuid}")
    public ResponseEntity<List<PatientDetails>> getPatientDataByAdr(@PathVariable("patientUuid") String patientUuid) {
        List<PatientDetails> patientData = adrService.getPatientDataByAdr(patientUuid);
        return ResponseEntity.ok(patientData);
    }


    @PutMapping("/update/{patientUuid}")
    public ResponseEntity<ApiResponse> updateADRByPatientId(@PathVariable("patientUuid")String patientUuid,@RequestBody ADRRequest request){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.updateADRByPatientId(patientUuid,request));
    }

    @GetMapping("/{patientUuid}")
    public ResponseEntity<ApiResponse>getAdrByPatientId(@PathVariable("patientUuid")String patientUuid){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.getADRByPatientId(patientUuid));
    }


    @GetMapping("/get_all")
    public ResponseEntity<ApiResponse> getAllAdrs(){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.getAllAdrs());
    }
}
