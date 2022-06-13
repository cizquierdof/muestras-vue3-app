package com.example.demo.githubmm;


import java.util.LinkedHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GithubService implements IGithubService {

    
    public GithubService() {}

    public ResponseEntity<Githubuser> mapea(LinkedHashMap githApiInfo) throws JsonMappingException, JsonProcessingException {

      githApiInfo.replaceAll((k, v) -> String.valueOf(v).replaceAll("=",""));

      ObjectMapper mapper = new ObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      String preparada = githApiInfo.toString();
      preparada = preparada.replaceAll(" ", "");
      preparada = preparada.replaceAll("=", "\"\\:\"");
      preparada = preparada.replaceAll(",", "\"\\,\"");
      preparada = preparada.replaceFirst("\\{", "\\{\"");
      preparada = preparada.replace("}", "\"}");

      Githubuser readValue = mapper.readValue(preparada, Githubuser.class);
      return ResponseEntity.ok(readValue);
    }

}