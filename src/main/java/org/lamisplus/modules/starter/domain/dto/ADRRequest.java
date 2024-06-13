package org.lamisplus.modules.starter.domain.dto;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ADRRequest {

    private Long patientId;
    private Integer weight;
    private AdverseEventDto adverseEventDto;
    private SuspectedDrugDto suspectedDrugDto;
    private ConcomitantMedicinesDto concomitantMedicinesDto;
    private String relevantTestDto;
    private Date relevantTestDateDto;
    private String preexistingMedicalConditionsDto;
    private ReporterDto reporterDto;
}

