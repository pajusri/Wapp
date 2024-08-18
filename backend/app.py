from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow cross-origin requests

    # Import blueprints inside the function to avoid circular imports
    from routes.auth import auth_bp
    from routes.customer import customer_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
