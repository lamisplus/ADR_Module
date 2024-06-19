package org.lamisplus.modules.starter.domain.dto;


import lombok.*;





@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ADRRequest {
    private String patientUuid;
    private Integer weight;
    private AdverseEffect adverseEffect;
    private SevereDrug severeDrug;
    private ConcomitantMedicines concomitantMedicines;
    private Reporter reporter;
}

