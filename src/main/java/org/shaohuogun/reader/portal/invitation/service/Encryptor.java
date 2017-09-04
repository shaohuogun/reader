package org.shaohuogun.reader.portal.invitation.service;

import java.security.MessageDigest;
import it.sauronsoftware.base64.Base64;

public class Encryptor {

    /**
     * MD5：信息摘要算法
     */
    private static final String KEY_MD5 = "MD5";

    /**
     * SHA：安全散列算法
     */
    private static final String KEY_SHA = "SHA";

    public static String encBASE64(String key) throws Exception {
        return Base64.encode(key);
    }

    public static String decBASE64(String key) throws Exception {
        return Base64.decode(key);
    }

    public static String encMD5(String key) throws Exception {
        MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
        md5.update(key.getBytes());
        return new String(md5.digest());
    }

    public static String encSHA(String key) throws Exception {
        MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
        sha.update(key.getBytes());
        return new String(sha.digest());
    }
    
}
