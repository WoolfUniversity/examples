package woolf.university;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;

final class Org {
    public String orgId;
    public String[] groups = {};

    public Org(String orgId) {
        this.orgId = orgId;
    }
}

class Main {
    public static void main(String[] args) {
        String COLLEGE_SECRET = "48a8dc3f18dfa959c85340364f9a5a1a";

        String studentId = "qwerty";
        String orgId = "eb4736aa-ca33-4804-8f05-f61e6e0a1c75";

        byte[] keyValue = COLLEGE_SECRET.getBytes(StandardCharsets.UTF_8);
        SecretKey key = Keys.hmacShaKeyFor(keyValue);

        String token = Jwts.builder()
                .claim("id", studentId)
                .claim("iss", "urn:WoolfUniversity:server/service/access")
                .claim("isVerified", true)
                .claim("kind", "oauth")
                .claim("org", new Org(orgId))
                .claim("scope", "*")
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        System.out.println(token);
    }
}
