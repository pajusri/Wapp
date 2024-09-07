from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow cross-origin requests

    # Import blueprints inside the function to avoid circular imports
    from routes.auth import auth_bp
    from routes.customer import customer_bp
    from routes.employee import employee_bp
    from routes.purchase import purchase_bp
    from routes.stock import stock_bp  
    from routes.acocoons import acocoons_bp
    from routes.waste_cocoons import waste_cocoons_bp  # Import the new blueprint
    from routes.customer_request import customer_request_bp  
    from routes.billing import billing_bp  

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(purchase_bp)
    app.register_blueprint(stock_bp)
    app.register_blueprint(acocoons_bp)
    app.register_blueprint(waste_cocoons_bp)  
    app.register_blueprint(customer_request_bp)
    app.register_blueprint(billing_bp)


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
