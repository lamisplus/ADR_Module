package org.lamisplus.modules.starter.service;

import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.lamisplus.modules.starter.domain.dto.ADRRequest;

public interface ARDService {
    ADRResponse createADR(ADRRequest request);

    ADRResponse updateADRByPatientId(Long patientId, ADRRequest request);

    ADRResponse getADRByPatientId(Long patientId);

    ADRResponse getAllAdrs( );

}
