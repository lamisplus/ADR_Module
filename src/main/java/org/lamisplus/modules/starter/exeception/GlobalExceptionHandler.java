package org.lamisplus.modules.starter.exeception;

import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.constants.GeneralResponseEnum;
import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.lamisplus.modules.starter.domain.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse>handleAllException(Exception ex){
        ApiResponse response = new ApiResponse();
        response.setStatusCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()));
        response.setMessage(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse> handleConstraintViolationException(ConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
        }

        ApiResponse apiResponse = new ApiResponse(
                GeneralResponseEnum.FAILED.getCode(),
                GeneralResponseEnum.FAILED.getMessage(),
                errors);

        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handlePayloadException(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }

        ApiResponse apiResponse = new ApiResponse(
                GeneralResponseEnum.FAILED.getCode(),
                GeneralResponseEnum.FAILED.getMessage(),
                errors);

        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ADRNotFoundException.class)
    public ResponseEntity<ApiResponse> handleADRNotFoundException(ADRNotFoundException ex) {
        ApiResponse apiResponse = new ApiResponse(
                GeneralResponseEnum.ERROR.getCode(),
                ex.getMessage(),
                GeneralResponseEnum.FAILED.getMessage());

        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ADRAlreadyExistException.class)
    public ResponseEntity<ApiResponse> handleADRAlreadyExistException(ADRAlreadyExistException ex) {
        ApiResponse apiResponse = new ApiResponse(
                GeneralResponseEnum.ERROR.getCode(),
                ex.getMessage(),
                GeneralResponseEnum.FAILED.getMessage());

        return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
    }

}
