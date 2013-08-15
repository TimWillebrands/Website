package controllers;

import models.Piece;
import models.PieceImage;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import play.Logger;
import play.api.templates.Html;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.Iterator;
import java.util.List;

import scala.collection.mutable.StringBuilder;

public class Application extends Controller {

    public static Result home() {
        return direct("werk");
    }

    public static Result direct(String subsite) {
        return ok( views.html.main.render(getSubsite(subsite),getMeta(subsite)) );
    }

    public static Result receiveSubsite(String subsite) {
        return ok( getSubsite(subsite) );
    }

    public static Result receiveMeta(String subsite) {
        return ok( getMeta(subsite) );
    }

    public static Html getSubsite(String subSiteName) {
        if(subSiteName.equalsIgnoreCase("werk")){
        	List<Piece> allPieces = Piece.find.all();
            return views.html.werk.render(allPieces);
        }else if(subSiteName.equalsIgnoreCase("dienst")){
        	List<Piece> allPieces = Piece.find.all();
            return views.html.dienst.render();
        }else if(subSiteName.equalsIgnoreCase("rave")){
            return views.html.rave.render();
        }else if(subSiteName.equalsIgnoreCase("cont")){
            return views.html.cont.render();
        }
        
    	StringBuilder tmp = new StringBuilder();
    	tmp.append("404 - Page not found");
        return new Html(tmp);
    }
    
    public static Html getMeta(String subSiteName){
        if(subSiteName.equalsIgnoreCase("werk")){
            return views.html.meta.werk.render();
        }else if(subSiteName.equalsIgnoreCase("dienst")){
            return views.html.meta.dienst.render();
        }else if(subSiteName.equalsIgnoreCase("rave")){
            return views.html.meta.rave.render();
        }else if(subSiteName.equalsIgnoreCase("cont")){
            return views.html.meta.cont.render();
        }
        
    	StringBuilder tmp = new StringBuilder();
    	tmp.append("400 - Internal server error");
        return new Html(tmp);
    }

    @SuppressWarnings("unchecked")
	public static Result getItem(Long pieceId) {

        Piece piece = Piece.find.byId(pieceId);
        JSONObject jsonPiece = new JSONObject();
        JSONArray images = new JSONArray();
        jsonPiece.put("name",piece.name);
        jsonPiece.put("desc",piece.description);
        jsonPiece.put("kind",piece.kind);
        Iterator<PieceImage> itr = piece.getImages().iterator();
        while(itr.hasNext()){
            PieceImage image = itr.next();
            JSONObject img = new JSONObject();
            img.put("name",image.name);
            img.put("focus",image.focus.replace("=", ""));
            img.put("url",image.url);
            images.add(img);
        }
        jsonPiece.put("images",images);

        return ok(jsonPiece.toJSONString());
    }
  
}
