package org.lamisplus.modules.starter.exeception;

public class ADRAlreadyExistException extends RuntimeException {
    public ADRAlreadyExistException(String message) {
        super(message);
    }
}
