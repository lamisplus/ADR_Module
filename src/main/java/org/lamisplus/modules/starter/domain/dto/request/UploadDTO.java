package org.lamisplus.modules.starter.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadDTO {
    private String filename;
    private LocalDate uploadDate;
    private String status;
}
