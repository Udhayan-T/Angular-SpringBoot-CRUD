package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserAuthenticationService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
public class UserAuthenticationController {

	@GetMapping("/home")
	public String home() {
		System.out.println("##### within UserAuthenticationController home() ");
		return "Welcome!";
	}

	static final long EXPIRATIONTIME = 30000000;
	Map<String, String> map = new HashMap<>();
	/*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use
	 * Constructor-based autowiring) Please note that we should not create an object
	 * using the new keyword
	 */

	private UserAuthenticationService userAuthenticationService;

	@Autowired
	public UserAuthenticationController(UserAuthenticationService userAuthenticationService) {
		this.userAuthenticationService = userAuthenticationService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP
	 * POST method
	 */
	@PostMapping("/api/v1/auth/register")
	public ResponseEntity<?> createUser(@RequestBody User user) {

		System.out.println("Create User "+user.toString());
		try {
			user.setUserAddedDate(new Date());
			userAuthenticationService.saveUser(user);
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>("User already exists", HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/api/v1/auth/isAuthenticated")
	public ResponseEntity<?> isAuthenticate(@PathParam("token") String token) {

		System.out.println("Within Isauthenticate "+token);
		return new ResponseEntity<>(HttpStatus.OK); 
	}
	
	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the username and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is not
	 * successful. If credentials are validated successfully, then JWT token will be
	 * generated. The token should be returned back to the caller along with the API
	 * response. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If login is successful 2.
	 * 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */

	@PostMapping("/api/v1/auth/login")
	public ResponseEntity<?> authenticate(@RequestBody User user) {
		String token;
		try {
			System.out.println("Inside Login "+user.toString());
			token = getToken(user.getUserId(), user.getUserPassword());
			map.clear();
			map.put("Message", "User Succesfully Logged In");
			map.put("Token", token);
			System.out.println("Inside Login1 "+ token);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("Message", e.getMessage());
			map.put("Token", null);
			return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
		}

	}

	// Generate JWT token
	public String getToken(String username, String password) throws Exception {
		User user;
		if (username == null || password == null) {
			throw new ServletException("Improper credentials");
		}
		user = userAuthenticationService.findByUserIdAndPassword(username, password);
		if (user == null) {
			throw new ServletException("User not found");
		}
		String token = Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, "secret").compact();

		return token;
	}

}
