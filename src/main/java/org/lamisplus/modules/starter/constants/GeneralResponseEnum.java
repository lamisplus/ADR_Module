package org.lamisplus.modules.starter.constants;

import lombok.Getter;

@Getter
public enum GeneralResponseEnum {

    SUCCESS("000","Success","process completed successfully"),
    FAILED("999","Failed", "process failed"),
    ERROR("90X","ERROR","An error occurred");

    private final String code;
    private final String message;
    private final Object data;

    GeneralResponseEnum(String code,String message, Object data){
        this.code= code;
        this.message =message;
        this.data = data;
    }
}
