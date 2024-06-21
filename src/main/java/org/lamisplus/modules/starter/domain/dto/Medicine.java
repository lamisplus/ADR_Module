package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @NotNull(message = "concomitant brandname is required")
    private String concomitantBrandName;
    @NotNull(message = "concomitant genericname is required")
    private Integer concomitantDosage;
    @NotNull(message = "concomitant dosage is required")
    private String concomitantRoute;
    //@Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateConcomitantStarted;
    //@Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateConcomitantStopped;
    private String concomitantReasonUse;
}
