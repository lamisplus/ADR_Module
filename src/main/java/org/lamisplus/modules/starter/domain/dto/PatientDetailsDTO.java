package org.lamisplus.modules.starter.domain.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientDetailsDTO {

    private String hospitalNumber;
    private String firstName;
    private String surname;
    private String sex;
    private String patientUuid;
    private Integer weight;
    private Long facilityID;
    private JsonNode adverseEffect;
    private JsonNode severeDrugs;
    private JsonNode concomitantMedicines;
    private JsonNode reporter;
}
