package org.lamisplus.modules.starter.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdverseEventDto {

    private String descriptionEvent;

    private List<String> seriousAdverseEffect;

    private String outcomes;

    private String onsetDateOfEvent;

    private Date stoppedDateOfEvent;
}
