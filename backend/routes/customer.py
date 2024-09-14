from flask import Blueprint, request, jsonify
from utils.excel_utils import write_to_excel, read_from_excel, update_excel, delete_from_excel

customer_bp = Blueprint('customer', __name__)

# Route for creating a new customer
@customer_bp.route('/customer', methods=['POST'])
def create_customer():
    data = request.get_json()
    file_path = '/Users/admin/APP1/data_new.xlsx'
    write_to_excel([data], file_path)
    return jsonify({'message': 'Customer data saved successfully'}), 200

# Route for getting all customer details
@customer_bp.route('/customer-details', methods=['GET'])
def customer_details():
    file_path = '/Users/admin/APP1/data_new.xlsx'
    data = read_from_excel(file_path)
    
    # Log what is being read from the Excel file
    print(f"Data read from Excel: {data}")
    
    return jsonify(data), 200


# Route for updating customer details
@customer_bp.route('/customer/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.get_json()
    file_path = '/Users/admin/APP1/data_new.xlsx'
    updated_data = {
        'name': data.get('name'),
        'phone_no': data.get('phone_no'),
        'email_id': data.get('email_id'),
        'chakki_center_name': data.get('chakki_center_name'),
        'address': data.get('address')
    }
    result = update_excel(file_path, id, updated_data)
    return jsonify({'success': result})

# Route for deleting a customer
@customer_bp.route('/customer/<int:id>', methods=['DELETE'])
def delete_customer(id):
    file_path = '/Users/admin/APP1/data_new.xlsx'
    result = delete_from_excel(file_path, id)
    return jsonify({'success': result})

# Route for getting a customer by ID
@customer_bp.route('/customer/<int:id>', methods=['GET'])
def get_customer(id):
    file_path = '/Users/admin/APP1/data_new.xlsx'
    customer = read_from_excel(file_path)
    for entry in customer:
        if entry['id'] == id:
            return jsonify(entry)
    return jsonify({'error': 'Customer not found'}), 404
