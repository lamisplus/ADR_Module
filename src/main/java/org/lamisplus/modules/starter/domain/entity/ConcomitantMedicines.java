package org.lamisplus.modules.starter.domain.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import java.util.Date;
import java.util.List;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ConcomitantMedicines {

    @ElementCollection
    @Column(name = "brands")
    private List<String> brands;
    @Column(name = "dosage")
    private Integer dosage;
    @Column(name = "route")
    private String route;
    @Column(name = "display")
    private String display;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date stopped;
    @Column(name = "reasons")
    private String reasons;
}
