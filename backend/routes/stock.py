from flask import Blueprint, request, jsonify
from utils.stock_excel_utils import write_to_excel, read_from_excel, update_excel, delete_from_excel

stock_bp = Blueprint('stock', __name__)

# File path for the Excel file
FILE_PATH = '/Users/admin/APP1/stock_data.xlsx'

# Route to handle cold storage entries
@stock_bp.route('/stock/cold-storage/entry', methods=['POST'])
def create_cold_storage_entry():
    data = request.get_json()
    write_to_excel([data], FILE_PATH, sheet_name='ColdStorage')
    return jsonify({'message': 'Cold storage entry saved successfully'}), 200

# Route to get all cold storage entries
@stock_bp.route('/stock/cold-storage/display', methods=['GET'])
def get_cold_storage_entries():
    data = read_from_excel(FILE_PATH, sheet_name='ColdStorage')
    return jsonify(data)

# Route to update a specific cold storage entry by ID
@stock_bp.route('/stock/cold-storage/<int:id>', methods=['PUT'])
def update_cold_storage_entry(id):
    data = request.get_json()
    updated_data = {
        'batch_no': data.get('batch_no'),
        'entry_date': data.get('entry_date'),
        'no_of_eggs': data.get('no_of_eggs'),
        'no_of_bundles': data.get('no_of_bundles')
    }
    result = update_excel(FILE_PATH, id, updated_data, sheet_name='ColdStorage')
    return jsonify({'success': result})

# Route to delete a specific cold storage entry by ID
@stock_bp.route('/stock/cold-storage/<int:id>', methods=['DELETE'])
def delete_cold_storage_entry(id):
    result = delete_from_excel(FILE_PATH, id, sheet_name='ColdStorage')
    return jsonify({'success': result})
