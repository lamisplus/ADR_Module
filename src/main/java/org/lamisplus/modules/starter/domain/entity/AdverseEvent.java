package org.lamisplus.modules.starter.domain.entity;

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
public class AdverseEvent {

    @Column(name = "description_event")
    private String descriptionEvent;

    @Column(name = "serious_adverse_effect")
    @ElementCollection
    private List<String>seriousAdverseEffect;

    @Column(name = "outcomes")
    private String outcomes;

    @Column(name = "onset_date_of_event")
    private String onsetDateOfEvent;

    @Column(name = "stopped_date_of_event")
    private Date stoppedDateOfEvent;
}