package org.lamisplus.modules.starter.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.starter.constants.GeneralResponseEnum;
import org.lamisplus.modules.starter.domain.dto.*;
import org.lamisplus.modules.starter.exeception.ADRAlreadyExistException;
import org.lamisplus.modules.starter.domain.entity.ADR;
import org.lamisplus.modules.starter.exeception.ADRNotFoundException;
import org.lamisplus.modules.starter.repository.ADRRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class ADRService {

    private final ADRRepository adrRepository;

    private final UserService userService;




    public ApiResponse createADR(ADRRequest request) {



        Optional<ADR> currentADR = adrRepository.findByPatientUuid(request.getPatientUuid());

        if (currentADR.isPresent()) {
            throw  new ADRAlreadyExistException("adr " + request.getPatientUuid()+ " already exist");
        }

        ADR adr = fromADRToDTO(request);
        log.info("returned adr: {}", adr);

        Optional<User> currentUser = userService.getUserWithRoles();
        log.info("current user: {}",currentUser);

        if (currentUser.isPresent()) {
            log.info("currentUser: " + currentUser.get());
            User user = currentUser.get();
            Long currentOrganisationUnitId = user.getCurrentOrganisationUnitId();
            adr.setFacilityID(currentOrganisationUnitId);
        }


        ADR saveADR = adrRepository.save(adr);
        log.info("saved ADR to db...{}" , saveADR);


        ADRResponse dtoFromADR = getDtoFromADR(saveADR);

        return ApiResponse.builder()
                .statusCode(String.valueOf(HttpStatus.CREATED.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(dtoFromADR)
                .build();


    }


    public List<PatientDetails> getPatientDataByAdr(String patientUuid){

        List<PatientDetails> patientDataByAdr = adrRepository.findPatientDataByAdr(patientUuid);

        if (patientDataByAdr.isEmpty()) {
            throw new ADRNotFoundException("No patient data found for ADR with patient ID " + patientUuid);
        }

        return patientDataByAdr;

    }


    public ApiResponse updateADRByPatientId(String patientUuid, ADRRequest request) {

        ADR existingAdr = adrRepository.findByPatientUuid(patientUuid)
                .orElseThrow(()-> new ADRAlreadyExistException("ARD does not exist"));

        ADR updatedAdr = fromADRToDTO(request);
        log.info("mapped adr info : {}", updatedAdr);

        updatedAdr.setId(existingAdr.getId()); // ensure tha same id for update

        ADR saveAdr = adrRepository.save(updatedAdr);
        log.info("saved to db: {}", saveAdr);

        return ApiResponse.builder()
                .statusCode(String.valueOf(HttpStatus.CREATED.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(saveAdr)
                .build();
    }

    public ApiResponse getADRByPatientId(String patientUuid){
        ADR adr = adrRepository.findByPatientUuid(patientUuid)
                .orElseThrow(()->new ADRNotFoundException("ADR with patient ID "
                        + patientUuid + " not found"));

        return ApiResponse.builder()
                .statusCode(String.valueOf(HttpStatus.OK.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(adr)
                .build();
    }

//    public ApiResponse getAllAdrs() {
//        List<PatientDetails> adrList = adrRepository.getAllPatientAdr();
//
//        log.info("adr list: {}", adrList);
//
//        if (adrList.isEmpty()) {
//            throw new ADRNotFoundException("No ADRs found");
//        }
//
//        return ApiResponse.builder()
//                .statusCode(String.valueOf(HttpStatus.OK.value()))
//                .message(GeneralResponseEnum.SUCCESS.getMessage())
//                .details(adrList)
//                .build();
//    }

    public ApiResponse getAllAdrs() {
        List<Object[]> results = adrRepository.getAllPatientAdr();
        List<PatientDetailsDTO> adrList = new ArrayList<>();

        for (Object[] result : results) {
            PatientDetailsDTO dto = new PatientDetailsDTO();
            dto.setHospitalNumber((String) result[0]);
            dto.setFirstName((String) result[1]);
            dto.setSurname((String) result[2]);
            dto.setSex((String) result[3]);
            dto.setPatientUuid((String) result[4]);
            dto.setWeight((Integer) result[5]);
            dto.setFacilityID((Long) result[6]);
            dto.setAdverseEffect((JsonNode) result[7]);
            dto.setSevereDrugs((JsonNode) result[8]);
            dto.setConcomitantMedicines((JsonNode) result[9]);
            dto.setReporter((JsonNode) result[10]);

            adrList.add(dto);
        }

        log.info("adr list: {}", adrList);

        if (adrList.isEmpty()) {
            throw new ADRNotFoundException("No ADRs found");
        }

        return ApiResponse.builder()
                .statusCode(String.valueOf(HttpStatus.OK.value()))
                .message(GeneralResponseEnum.SUCCESS.getMessage())
                .details(adrList)
                .build();
    }




    private ADR fromADRToDTO(ADRRequest adrRequest){

        Long facilityId = getCurrentUserOrganization();
        log.info("facility id {}", facilityId);

        ADR adr = new ADR();

        adr.setPatientUuid(adrRequest.getPatientUuid());
        adr.setWeight(adrRequest.getWeight());
        AdverseEffect adverseEffect = adrRequest.getAdverseEffect();
        ConcomitantMedicines concomitantMedicines = adrRequest.getConcomitantMedicines();
        SevereDrug severeDrug = adrRequest.getSevereDrug();
        Reporter reporter = adrRequest.getReporter();

        ObjectMapper mapper = new ObjectMapper();

        adr.setAdverseEffect(mapper.valueToTree(adverseEffect));
        adr.setConcomitantMedicines(mapper.valueToTree(concomitantMedicines));
        adr.setSevereDrugs(mapper.valueToTree(severeDrug));
        adr.setReporter(mapper.valueToTree(reporter));

        return adr;


    }


    private ADRResponse getDtoFromADR(ADR adr)
    {
        ADRResponse response = new ADRResponse();
        response.setPatientUuid(adr.getPatientUuid());
        response.setWeight(adr.getWeight());
        response.setAdverseEffect(adr.getAdverseEffect());
        response.setConcomitantMedicines(adr.getConcomitantMedicines());
        response.setSevereDrug(adr.getSevereDrugs());
        response.setReporter(adr.getReporter());

        return response;

    }


    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }


}
