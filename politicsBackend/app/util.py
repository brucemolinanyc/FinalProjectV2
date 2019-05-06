import hashlib, uuid, random
import requests
import jwt 
import datetime

salt = "MYSALT"  # generates a random uuid
encoded_salt = salt.encode() 


def hash_password(password):
    encoded_pw = password.encode()
    hashed_pw = hashlib.sha512(encoded_pw + encoded_salt).hexdigest()
    return hashed_pw


def encodeAuthToken(pk):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'user': pk
    }
    token = jwt.encode(payload, 'secret-key', algorithm='HS256')
    return token

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'secret-key', algorithm='HS256')
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'
