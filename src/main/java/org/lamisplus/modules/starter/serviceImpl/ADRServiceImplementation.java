package org.lamisplus.modules.starter.serviceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.starter.constants.GeneralResponseEnum;
import org.lamisplus.modules.starter.domain.dto.ADRResponse;
import org.lamisplus.modules.starter.exeception.ADRAlreadyExistException;
import org.lamisplus.modules.starter.domain.dto.ADRRequest;
import org.lamisplus.modules.starter.domain.entity.ADR;
import org.lamisplus.modules.starter.exeception.ADRNotFoundException;
import org.lamisplus.modules.starter.repository.ADRRepository;
import org.lamisplus.modules.starter.service.ARDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ADRServiceImplementation implements ARDService {

    private final ADRRepository adrRepository;
    private final ModelMapper modelMapper;

    @Override
    public ADRResponse createADR(ADRRequest request) {

        Optional<ADR> adr = adrRepository.findByPatientId(request.getPatientId());
        log.info("adr info : {}", adr);

        if(adr.isPresent()){
            throw new ADRAlreadyExistException("ARD for patient with ID "
                    + request.getPatientId() + "already exist");
        }

        ADR mappedAdr = modelMapper.map(request, ADR.class);
        log.info("mapped adr info : {}", mappedAdr);


        ADR saveAdr = adrRepository.save(mappedAdr);
        log.info("saved to db: {}" ,saveAdr);

        return ADRResponse.builder()
                .statusCode(String.valueOf(HttpStatus.CREATED.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(saveAdr)
                .build();
    }

    @Override
    public ADRResponse updateADRByPatientId(Long patientId, ADRRequest request) {

        Optional<ADR> adr = adrRepository.findByPatientId(request.getPatientId());

        if (!adr.isPresent()) {
            throw new ADRAlreadyExistException("ARD does not exist");
        }
        ADR mappedAdr = modelMapper.map(request, ADR.class);
        log.info("mapped adr info : {}", mappedAdr);

        ADR saveAdr = adrRepository.save(mappedAdr);
        log.info("saved to db: {}", saveAdr);

        return ADRResponse.builder()
                .statusCode(String.valueOf(HttpStatus.CREATED.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(saveAdr)
                .build();
    }


    public ADRResponse getADRByPatientId(Long patientId){
        Optional<ADR> adr = adrRepository.findByPatientId(patientId);

        if (!adr.isPresent()) {
            throw new ADRNotFoundException("ADR with ID " + patientId + " not found");
        }

        ADRRequest adrRequest = modelMapper.map(adr.get(), ADRRequest.class);

        return ADRResponse.builder()
                .statusCode(String.valueOf(HttpStatus.OK.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(adrRequest)
                .build();
    }

    public ADRResponse getAllAdrs( ){

        List<ADRRequest> adrList = adrRepository.findAll().stream()
                .map(adr -> modelMapper.map(adr, ADRRequest.class)).
                collect(Collectors.toList());

        if (adrList.isEmpty()){
            throw new ADRNotFoundException("No ADR found");
        }

        return ADRResponse.builder()
                .statusCode(String.valueOf(HttpStatus.OK.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(adrList)
                .build();


    }
}
