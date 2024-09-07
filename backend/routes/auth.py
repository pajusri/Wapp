from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# Define users and their roles
users = {
    "owner": {"password": "test", "role": "owner"},
    "manager": {"password": "test", "role": "manager"},
    "accountant": {"password": "test", "role": "accountant"}
}

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Find the user
    user = users.get(username)

    if user and user['password'] == password:
        # Return the role along with the login success message
        return jsonify({'message': 'Login successful', 'role': user['role']}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

