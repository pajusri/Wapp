from flask import Blueprint, jsonify
from utils.stock_excel_utils import read_from_excel

acocoons_bp = Blueprint('acocoons', __name__)

# File path for the Excel file
FILE_PATH = '/Users/admin/APP1/purchase_data.xlsx'

@acocoons_bp.route('/acocoons/<breed>', methods=['GET'])
def get_cocoons_entries(breed):
    sheet_name = breed
    data = read_from_excel(FILE_PATH, sheet_name)
    
    # Transform the data to match the frontend expectations
    transformed_data = []
    
    for entry in data:
        print("Processing entry:", entry)  # Debug print to check each entry
        
        # Map the correct columns from Excel file to JSON response
        transformed_entry = {
            'id': entry.get('id', None),  # Ensure ID is included
            'market': entry.get('batch_no', 'Unknown'),  # Map 'batch_no' to 'market'
            'lot_no': entry.get('entry_date', 'Unknown'),  # Map 'entry_date' to 'lot_no'
            'kgs_purchased': entry.get('no_of_eggs', 'Unknown'),  # Map 'no_of_eggs' to 'kgs_purchased'
            'farmer_name': entry.get('farmer_name', 'Unknown'),  # Map 'farmer_name'
            'date_of_purchase': entry.get('date_of_purchase', 'Unknown'),  # Map 'date_of_purchase'
            'price_per_kg': 'Excluded',  # Exclude 'price_per_kg'
            'total_cost': 'Excluded'     # Exclude 'total_cost'
        }
        
        transformed_data.append(transformed_entry)

    # Print final transformed data for debugging
    print("Transformed data to be sent to frontend:", transformed_data)
    
    return jsonify(transformed_data)
