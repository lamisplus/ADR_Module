package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface PatientDetails {

    String hospital_number();
    String first_name();
    String surname();
    String sex();
    String patientUuid();
    Integer weight();
    Long facilityID();
    JsonNode adverseEffect();
    JsonNode severeDrugs();
    JsonNode concomitantMedicines();
    JsonNode reporter();
}
