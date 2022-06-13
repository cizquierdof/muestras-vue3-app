package com.example.demo.githubmm;

import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.LinkedHashMap;

import org.springframework.boot.json.JsonParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
public class GithubuserServiceController {
   

    private final IGithubService GithubService;

    public GithubuserServiceController(IGithubService GithubService) {
        this.GithubService = GithubService;
    }

  
    @CrossOrigin(origins = "http://localhost:4000")
    @GetMapping("/ghuserDirecto")
    public ResponseEntity<String> directo(@RequestParam(value = "user", defaultValue = "") String user)
    {
       
        String url = "https://api.github.com/users/" + user;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }
    
    
    @CrossOrigin(origins = "http://localhost:4000")
    @GetMapping("/ghuserMapping")
    public ResponseEntity<Githubuser> mapping(@RequestParam(value = "user", defaultValue = "") String user)
    {
       
        // String resstring = result.toString();
        String url = "https://api.github.com/users/" + user;
        RestTemplate restTemplate = new RestTemplate();
        LinkedHashMap result = null;
        try {
            result = restTemplate.getForObject(url, LinkedHashMap.class);
        } catch(HttpStatusCodeException e) {
            return ResponseEntity.ok(new Githubuser());
        }
       
        try {
            return GithubService.mapea(result);
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return ResponseEntity.ok(new Githubuser());
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return ResponseEntity.ok(new Githubuser());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return ResponseEntity.ok(new Githubuser());
        }
    }  
}
