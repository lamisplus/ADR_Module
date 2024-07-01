package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ADRRequest {
    @NotNull(message = "Patient UUID is required")
    private String patientUuid;
    @NotNull(message = "Weight is required")
    @Min(value = 1, message = "Weight must be greater than 0")
    private Integer weight;
    @NotNull(message = "report date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private LocalDate reportDate;
    private AdverseEffect adverseEffect;
    private SevereDrug severeDrug;
    private ConcomitantMedicines concomitantMedicines;
    private Reporter reporter;
}

