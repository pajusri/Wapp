from flask import Blueprint, request, jsonify
from utils.purchase_excel_utils import write_to_excel, read_from_excel, delete_purchase_from_excel

purchase_bp = Blueprint('purchase', __name__)

# Common function for adding a purchase entry
def add_purchase(data, sheet_name):
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    write_to_excel([data], file_path, sheet_name)
    return jsonify({'message': f'{sheet_name} purchase data saved successfully'}), 200

# Route to handle FR purchases
@purchase_bp.route('/purchase/fr', methods=['POST'])
def purchase_fr():
    data = request.get_json()
    return add_purchase(data, 'FR')

@purchase_bp.route('/purchase/fr', methods=['GET'])
def get_fr_purchases():
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    data = read_from_excel(file_path, 'FR')
    return jsonify(data)

@purchase_bp.route('/purchase/fr/<int:id>', methods=['DELETE'])
def delete_fr_purchase(id):
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    result = delete_purchase_from_excel(file_path, 'FR', id)
    return jsonify({'success': result})

# Route to handle MSC purchases
@purchase_bp.route('/purchase/msc', methods=['POST'])
def purchase_msc():
    data = request.get_json()
    return add_purchase(data, 'MSC')

@purchase_bp.route('/purchase/msc', methods=['GET'])
def get_msc_purchases():
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    data = read_from_excel(file_path, 'MSC')
    return jsonify(data)

@purchase_bp.route('/purchase/msc/<int:id>', methods=['DELETE'])
def delete_msc_purchase(id):
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    result = delete_purchase_from_excel(file_path, 'MSC', id)
    return jsonify({'success': result})

# Route to handle FC1 purchases
@purchase_bp.route('/purchase/fc1', methods=['POST'])
def purchase_fc1():
    data = request.get_json()
    return add_purchase(data, 'FC1')

@purchase_bp.route('/purchase/fc1', methods=['GET'])
def get_fc1_purchases():
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    data = read_from_excel(file_path, 'FC1')
    return jsonify(data)

@purchase_bp.route('/purchase/fc1/<int:id>', methods=['DELETE'])
def delete_fc1_purchase(id):
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    result = delete_purchase_from_excel(file_path, 'FC1', id)
    return jsonify({'success': result})

# Route to handle FC2 purchases
@purchase_bp.route('/purchase/fc2', methods=['POST'])
def purchase_fc2():
    data = request.get_json()
    return add_purchase(data, 'FC2')

@purchase_bp.route('/purchase/fc2', methods=['GET'])
def get_fc2_purchases():
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    data = read_from_excel(file_path, 'FC2')
    return jsonify(data)

@purchase_bp.route('/purchase/fc2/<int:id>', methods=['DELETE'])
def delete_fc2_purchase(id):
    file_path = '/Users/admin/APP1/purchase_data.xlsx'
    result = delete_purchase_from_excel(file_path, 'FC2', id)
    return jsonify({'success': result})
