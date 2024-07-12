package org.lamisplus.modules.starter.domain.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse {

    private String statusCode;
    private String message;
    private Object details;
}
