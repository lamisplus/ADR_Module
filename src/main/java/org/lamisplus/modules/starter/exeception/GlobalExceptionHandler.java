package org.lamisplus.modules.starter.exeception;

import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.constants.GeneralResponseEnum;
import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ADRResponse> handleConstraintViolationException(ConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
        }

        ADRResponse apiResponse = new ADRResponse(
                GeneralResponseEnum.FAILED.getCode(),
                GeneralResponseEnum.FAILED.getMessage(),
                errors);

        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ADRResponse> handlePayloadException(MethodArgumentNotValidException ex) {
        return new ResponseEntity<>(new ADRResponse(String.valueOf(HttpStatus.NOT_FOUND.value()),
                ex.getMessage(),
                GeneralResponseEnum.FAILED.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ADRNotFoundException.class)
    public ResponseEntity<ADRResponse> handleADRNotFoundException(ADRNotFoundException ex) {
        return new ResponseEntity<>(new ADRResponse(String.valueOf(HttpStatus.NOT_FOUND.value()),
                ex.getMessage(),
                GeneralResponseEnum.FAILED.getMessage()), HttpStatus.NOT_FOUND);
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ADRAlreadyExistException.class)
    public ResponseEntity<ADRResponse> handleADRAlreadyExistException(ADRAlreadyExistException ex) {
        return new ResponseEntity<>(new ADRResponse(String.valueOf(HttpStatus.NOT_FOUND.value()),
                ex.getMessage(),
                GeneralResponseEnum.FAILED.getMessage()), HttpStatus.NOT_FOUND);
    }

}
