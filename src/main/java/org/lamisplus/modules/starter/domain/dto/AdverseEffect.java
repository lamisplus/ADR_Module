package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Convert;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdverseEffect implements Serializable {

    private String eventDescription;
    private boolean death;
    private boolean lifeThreatening;
    private String hospitalization;
    private LocalDate dateOfDeath;
    private boolean disability;
    private boolean anomaly;
    private boolean intervention;
    private boolean others;
    private boolean otherDescription;
    private String outcomes;
    @Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate onsetDate;
    @Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate stoppedDate;
    private String outcomesOtherDescription;
}
