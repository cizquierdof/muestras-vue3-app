package com.example.demo.githubmm;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class Githubuser {
    private  long id;
    private  String username;
    private  String login;
    private  String avatar_url;
    private  String name;

    // public Githubuser(){};

 
    // public Githubuser(String name){
    //     this.username = name;
    //     this.id=0;
    //     this.avatar_url = null;
    //     this.login = null;
    //     this.name = name;
    // }

    // public String getId(){
    //     return String.valueOf(this.id);
    // }
    // public String getUsername(){
    //     return this.username;
    // }
    // public String getLogin(){
    //     return this.login;
    // }
    // public String getAvatar(){
    //     return this.avatar_url;
    // }
    // public String getName(){    
    //     return this.name;
    // }
    // public  void setId(long id){
    //     this.id = id;
    // }
    // public void setName(String name){
    //     this.name = name;
    // }
    // public void setUsername(String username){
    //     this.username = username;
    // }
    // public void setLogin(String login){
    //     this.login = login;
    // }
    // public void setAvatar_url(String avatar_url){
    //     this.avatar_url = avatar_url;
    // }
    // @Override
    // public boolean equals(Object o) {
  
    //   if (this == o)
    //     return true;
    //   if (!(o instanceof Githubuser))
    //     return false;
    //   Githubuser employee = (Githubuser) o;
    //   return Objects.equals(this.id, employee.id) && Objects.equals(this.username, employee.username)
    //       && Objects.equals(this.login, employee.login);
    // }
  
    // @Override
    // public int hashCode() {
    //   return Objects.hash(this.id, this.username, this.login);
    // }
    // @Override
    // public String toString() {
    //   return  this.username.toString() + this.login.toString() + this.name.toString().toUpperCase();
    // }
  
  
}
