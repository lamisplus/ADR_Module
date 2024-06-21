package org.lamisplus.modules.starter.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.FetchType;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SevereDrug {

    @Type(type = "jsonb")
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "drugs",columnDefinition = "jsonb")
    private List<Drug> drugs;
    @NotNull(message = "relevant is required")
    private Integer dosage;
    @NotNull(message = "frequency is required")
    private Integer frequency;
    @NotNull(message = "duration is required")
    private String administrationRoute;
//    @Convert(converter = LocalDateTime.class)
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "dateMedicationStarted is required")
    private LocalDate dateMedicationStarted;
//    @Convert(converter = LocalDateTime.class)
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateMedicationStopped;
    @NotNull(message = "reasonMedicationStopped is required")
    private String reactionStopped;
    @NotNull(message = "reactionReappeared is required")
    private String reactionReappeared;

}
