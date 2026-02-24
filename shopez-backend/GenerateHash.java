import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String[] passwords = {"Admin@123", "Demo@123", "password123"};
        
        for (String password : passwords) {
            String hash = encoder.encode(password);
            System.out.println(password + " = " + hash);
        }
    }
}
