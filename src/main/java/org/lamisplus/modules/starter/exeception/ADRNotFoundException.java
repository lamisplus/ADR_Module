package org.lamisplus.modules.starter.exeception;

public class ADRNotFoundException extends RuntimeException {
    public ADRNotFoundException(String message) {
        super(message);
    }
}
