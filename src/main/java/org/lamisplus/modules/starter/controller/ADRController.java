package org.lamisplus.modules.starter.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.domain.dto.ADRRequest;
import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.lamisplus.modules.starter.serviceImpl.ADRServiceImplementation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/adr")
public class ADRController {

    private final ADRServiceImplementation adrService;

    @PostMapping("/create")
    public ResponseEntity<ADRResponse> createADR(@Valid @RequestBody ADRRequest request){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.createADR(request));
    }

    @PutMapping("/update/{patient_id}")
    public ResponseEntity<ADRResponse> updateADRByPatientId(@PathVariable("patient_id")Long patientId,@RequestBody ADRRequest request){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.updateADRByPatientId(patientId,request));
    }

    @GetMapping("/{Patient_Id}")
    public ResponseEntity<ADRResponse>getAdrByPatientId(@PathVariable("Patient_Id") Long patientId){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.getADRByPatientId(patientId));
    }


    @PostMapping("/get_all")
    public ResponseEntity<ADRResponse> getAllAdrs(){
        log.info("entering into the create controller...!");
        return ResponseEntity.ok(adrService.getAllAdrs());
    }
}
