package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface PatientDetails {

    String geHospitalNumber();
    String getFirstName();
    String getSurname();
    String getSex();
    String getPatientUuid();
    Integer getWeight();
    Long getFacilityID();
    JsonNode getAdverseEffect();
    JsonNode getSevereDrugs();
    JsonNode getConcomitantMedicines();
    JsonNode getReporter();
}
