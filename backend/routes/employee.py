from flask import Blueprint, request, jsonify
from utils.EMP_excel_utils import write_to_excel, read_from_excel, update_excel, delete_from_excel

employee_bp = Blueprint('employee', __name__)

# Route for creating a new employee
@employee_bp.route('/employee', methods=['POST'])
def create_employee():
    data = request.get_json()
    file_path = '/Users/admin/APP1/employee_data.xlsx'
    write_to_excel([data], file_path)
    return jsonify({'message': 'Employee data saved successfully'}), 200

# Route for getting all employee details
@employee_bp.route('/employee-details', methods=['GET'])
def employee_details():
    file_path = '/Users/admin/APP1/employee_data.xlsx'
    data = read_from_excel(file_path)
    return jsonify(data)

@employee_bp.route('/employee/<int:row_id>', methods=['PUT'])
def update_employee(row_id):
    try:
        # Convert row_id to an integer
        row_id = int(row_id)
        
        updated_data = request.get_json()
        file_path = '/Users/admin/APP1/employee_data.xlsx'

        # Check if the row_id is valid and update the Excel file
        result = update_excel(file_path, row_id, updated_data)
        
        if result:
            return jsonify({'message': 'Employee updated successfully'}), 200
        else:
            return jsonify({'message': 'Failed to update employee'}), 400
    except ValueError:
        return jsonify({'message': 'Invalid row_id type'}), 400
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500



# Route for deleting an employee
@employee_bp.route('/employee/<int:row_id>', methods=['DELETE'])
def delete_employee(row_id):
    file_path = '/Users/admin/APP1/employee_data.xlsx'
    try:
        # Convert row_id to an integer explicitly
        row_id = int(row_id)
    except ValueError:
        print(f"Invalid row_id: {row_id}")
        return jsonify({'success': False, 'message': 'Invalid ID'}), 400

    result = delete_from_excel(file_path, row_id)
    return jsonify({'success': result})
