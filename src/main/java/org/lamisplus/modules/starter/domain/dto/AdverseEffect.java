package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Convert;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdverseEffect implements Serializable {

    @NotNull(message = "Event description is required")
    private String eventDescription;
    @NotNull(message = "death is required")
    private boolean death;
    @NotNull(message = "life Threatening is required")
    private boolean lifeThreatening;
    @NotNull(message = "hospitalization is required")
    private String hospitalization;
    @NotNull(message = "date of death is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfDeath;
    @NotNull(message = "disability is required")
    private boolean disability;
    @NotNull(message = "anomaly is required")
    private boolean anomaly;
    @NotNull(message = "intervention is required")
    private boolean intervention;
    private boolean others;
    private String otherDescription;
    @NotNull(message = "outcomes is required")
    private String outcomes;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date onsetDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date stoppedDate;
    private String outcomesOtherDescription;
}
