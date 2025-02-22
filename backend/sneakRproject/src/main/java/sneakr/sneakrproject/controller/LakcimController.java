/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.controller;

import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import sneakr.sneakrproject.model.Lakcimek;
import sneakr.sneakrproject.service.LakcimService;

/**
 *
 * @author TothKrisztian
 */
@Path("lakcimek")
public class LakcimController {
    
    @Context
    
    private UriInfo context;
    private LakcimService layer = new LakcimService();
    
     public LakcimController() {
    }
     
@GET
@Path("getAllLakcim")
@Produces(MediaType.APPLICATION_JSON)
public Response getAllLakcim() {
    JSONObject responseObj = new JSONObject();

    try {
        // Call the service to get the list of users
        ArrayList<Lakcimek> LakcimekList = layer.getAllLakcim();  // Assuming layer.getAllUsers() returns an ArrayList<User>

        // Initialize a JSON array to store user data
        JSONArray LakcimekArray = new JSONArray();

        // Iterate over the user list and convert each user to a JSONObject
        for (Lakcimek u : LakcimekList) {
            JSONObject lakcimekJson = new JSONObject();
            lakcimekJson.put("id", u.getId()); 
            lakcimekJson.put("user_id", u.getUserId());
            lakcimekJson.put("telefonszam", u.getTelefonszam());
            lakcimekJson.put("varos", u.getVaros());
            lakcimekJson.put("iranyitoszam", u.getIranyitoszam());
            lakcimekJson.put("utcaHazszam", u.getUtcaHazszam());

            // Add the user JSON object to the array
            LakcimekArray.put(lakcimekJson);
        }

        // Add the users array to the response object
        responseObj.put("statusCode", 200);
        responseObj.put("Lakcimek", LakcimekArray);

        // Return the response with a 200 OK status
        return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

    } catch (Exception e) {
        // Handle any exceptions
        responseObj.put("statusCode", 500);
        responseObj.put("message", "Failed to retrieve users");
        responseObj.put("error", e.getMessage());
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
}  

@POST
@Path("insertLakcim")
@Consumes(MediaType.APPLICATION_JSON)
public Response insertLakcim(String bodyString) {
    try {
        JSONObject body = new JSONObject(bodyString);
        
        Lakcimek u = new Lakcimek(
            body.getInt("userId"),
            body.getString("telefonszam"),
            body.getString("varos"), 
            body.getString("iranyitoszam"),
            body.getString("utcaHazszam")
        );
        
        JSONObject obj = layer.insertLakcim(u);
        return Response.status(obj.getInt("statusCode"))
                       .entity(obj.toString())
                       .build();
    } catch (JSONException e) {
        JSONObject error = new JSONObject();
        error.put("status", "InvalidRequest");
        error.put("statusCode", 400);
        error.put("message", "Malformed JSON input");
        return Response.status(400).entity(error.toString()).build();
    }
}
}
