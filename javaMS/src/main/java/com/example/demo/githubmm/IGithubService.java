package com.example.demo.githubmm;

import java.io.IOException;
import java.util.LinkedHashMap;

import org.springframework.boot.json.JsonParseException;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.JsonMappingException;

public interface IGithubService {

    ResponseEntity<Githubuser> mapea(LinkedHashMap name) throws JsonParseException, JsonMappingException, IOException;

}