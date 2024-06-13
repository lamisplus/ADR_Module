package org.lamisplus.modules.starter.domain.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ADRResponse {

    private String statusCode;
    private String message;
    private Object details;
}
