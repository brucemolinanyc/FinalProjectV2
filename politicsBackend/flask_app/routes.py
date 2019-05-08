from flask import jsonify, abort, request, make_response, current_app
import requests
from flask_app import app
from app.account import Account
from app.orm import ORM
from app.voters import Voters
from app.util import encodeAuthToken, decodeAuthToken
import jwt
import datetime

UNAUTHORIZED = {"error": "unauthorized", "status_code": 401}
NOT_FOUND = {"error": "not found", "status_code": 404}
APP_ERROR = {"error": "application error", "status_code": 500}
BAD_REQUEST = {"error": "bad request", "status_code": 400}

@app.route('/', methods=['GET'])
def home():
    return jsonify({"test": "working"})

@app.route('/create', methods=['GET', 'POST'])
def create():
    if not request.json or 'email' not in request.json or 'password_hash' not in request.json:
        return jsonify(BAD_REQUEST), 401
    account = Account(email = request.json['email'], password_hash =request.json['password_hash'])
    account.save()
    token = encodeAuthToken(account.pk)
    
    return jsonify({'status': 'success', 'auth_token': str(token)}) 

@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        return jsonify(BAD_REQUEST), 401
    account = Account.login(request.json['email'], request.json['password'])
    if not account:
        return jsonify(UNAUTHORIZED), 401
    
    token = encodeAuthToken(account.pk)
  
    return jsonify({'status': 'success', 'auth_token': str(token)}) 

@app.route('/home', methods=['GET'])
def homepage():
    authHeader = request.headers['Authorization']
    token = authHeader.split(" ")[1]
    decoded_token = decodeAuthToken(token)
    user = Account.one_from_pk(decoded_token['user'])
    return jsonify({'status': 'success', 'user': user.username}) 

@app.route('/search/<FirstName>/<LastName>/<formattedGender>/<formattedBirthdate>/<ZipCode>', methods=['GET'])
def search(FirstName, LastName, formattedGender, formattedBirthdate, ZipCode):
    voter = Voters.get_voter(FirstName, LastName, formattedGender, formattedBirthdate, ZipCode)
    if voter:
        voterName = "{} {}".format(voter.FirstName, voter.LastName)
        return jsonify({'voter': voterName, 'truthy': True})
    else:
        return jsonify({'voter': False, 'truthy': False })


@app.route('/user/<id>')
def user(id):
        user = Account.one_from_pk(id)
        return jsonify({"user": user.username})


@app.route('/google/<city>/<state>/<zipcode>')
def representatives(city, state, zipcode):
    request_headers = {'Access-Control-Allow-Origin': '*', 'Accept': '/', 'accept-encoding': 'gzip, deflate', 'Connection': 'keep-alive'}
    response = requests.get('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAGlkBc9s481EmabJcY3xA3TdLYpruUAHI&address=' + str(city) + '20%' + str(state) + '%20' + str(zipcode), headers=request_headers)   
    data = response.json()
    return jsonify({'divisions': data['divisions'], 'offices': data['offices'], 'officials': data['officials']})
    # https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAGlkBc9s481EmabJcY3xA3TdLYpruUAHI&address=whitestone%20%ny%2011357
    # https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAGlkBc9s481EmabJcY3xA3TdLYpruUAHI&fields=officials&address={}20%{}%20{}'.format(city,state,zipcode), headers={"Accept": "*/*","Access-Control-Allow-Origin" : "*", "X-Content-Type-Options": "nosniff"}
    # https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAGlkBc9s481EmabJcY3xA3TdLYpruUAHI&fields=officials&address=' + city + "20%" + state + "%20" + zipcode, headers={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
    # https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAGlkBc9s481EmabJcY3xA3TdLYpruUAHI&fields=officials&address=' + city + "20%" + state + "%20" + zipcode