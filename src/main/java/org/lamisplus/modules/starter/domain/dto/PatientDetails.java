package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface PatientDetails {

    public String hospital_number();
    public String first_name();
    public String surname();
    public String sex();
    public String patientUuid();
    public Integer weight();
    public Long facilityID();
    public JsonNode adverseEffect();
    public JsonNode severeDrugs();
    public JsonNode concomitantMedicines();
    public JsonNode reporter();
}
