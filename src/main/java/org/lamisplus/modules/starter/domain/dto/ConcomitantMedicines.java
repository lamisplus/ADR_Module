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
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ConcomitantMedicines implements Serializable {

    @Type(type = "jsonb")
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "brands",columnDefinition = "jsonb")
    private List<Medicine> medicines;
    @NotNull(message = "relevant is required")
    private String relevantTest;
    @Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate relevantTestDate;
    @NotNull(message = "relevant results is required")
    private String relevantResult;
    @Convert(converter = LocalDateTime.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate relevantResultDate;
    private String preexistingMedicalConditions;
    private String preexistingMedicalOthers;
}
