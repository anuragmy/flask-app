from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import Column, Integer, String, Float
import os
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import datetime
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# setting up base directory for db file
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(
    basedir + '/pic_upload.db')
app.config['JWT_SECRET_KEY'] = 'python321@%'  # change this IRL

db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'])
            current_user = User.query.filter_by(
                user_id=data['user_id']).first()
        except:
            return jsonify({'message': 'token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# database actions with cli
@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database destroyed')


@app.route('/sign-up', methods=['POST'])
@cross_origin()
def sign_up():
    data = request.get_json()
    email = data['email']
    check_email = User.query.filter_by(email=email).first()
    if check_email:
        return jsonify(message="user already registered, please sign in")
    else:

        hashed_password = generate_password_hash(data['password'],
                                                 method='sha256')
        user = User(user_id=str(uuid.uuid4()),
                    email=data['email'],
                    password=hashed_password)
        db.session.add(user)
        db.session.commit()

        # create token
        token = jwt.encode(
            {
                'user_id':
                user.user_id,
                'exp':
                datetime.datetime.utcnow() + datetime.timedelta(minutes=3600)
            }, app.config['JWT_SECRET_KEY'])
        return jsonify({
            'message': 'signed in',
            "email": user.email,
            "user_id": user.user_id,
            'token': token.decode('UTF-8')
        })


@app.route('/sign-in', methods=["POST"])
@cross_origin()
def sign_in():
    data = request.get_json()
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if user:
        if check_password_hash(user.password, data['password']):
            print('passowrd matcj')
            # create token
            token = jwt.encode(
                {
                    'user_id':
                    user.user_id,
                    'exp':
                    datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, app.config['JWT_SECRET_KEY'])
            return jsonify({
                'message': 'signed in',
                "email": user.email,
                "user_id": user.user_id,
                'token': token.decode('UTF-8')
            })
        else:
            return ({'message': "Invalid email or password"})
    else:
        return jsonify(message="user not registered, please sign up"), 401


@app.route('/image_upload', methods=['POST'])
@cross_origin()
@token_required
def image_upload(current_user):

    data = request.get_json(force=True)
    image = data['image']
    new_image = Images(image_id=current_user.user_id, image_string=image)
    db.session.add(new_image)
    db.session.commit()
    return jsonify({'message': 'image saved!', 'image': data})


@app.route('/images', methods=['GET'])
@cross_origin()
@token_required
def images(current_user):
    all_images = Images.query.filter_by(image_id=current_user.user_id).all()
    result = images_schema.dump(all_images)
    return jsonify({'images': result.data})


# database models


class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    user_id = Column(String, unique=True)


class Images(db.Model):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    image_id = Column(String)
    image_string = Column(String)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'password', 'user_id')


class ImageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'image_id', 'image_string')


user_schema = UserSchema()
images_schema = ImageSchema(many=True)

if __name__ == "__main__":
    app.run(debug=True)
