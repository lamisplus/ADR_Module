package org.lamisplus.modules.starter.domain.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ADRResponse {

    private String patientUuid;
    private Integer weight;
    private Long facilityID;
    private Object adverseEffect;
    private Object severeDrug;
    private Object concomitantMedicines;
    private Object reporter;

}