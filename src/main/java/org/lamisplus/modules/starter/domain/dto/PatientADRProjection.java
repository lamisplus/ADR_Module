package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.databind.JsonNode;


public interface PatientADRProjection {
    String getHospitalNumber();
    String getFirstName();
    String getSurname();
    String getSex();
    String getDob();
    String getPatientUuid();

}
