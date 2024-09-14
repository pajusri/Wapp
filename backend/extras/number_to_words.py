# number_to_words

def number_to_words(n):
    units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
    tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    
    def _convert_below_1000(num):
        if num < 20:
            return units[num]
        elif num < 100:
            return tens[num // 10] + ('' if num % 10 == 0 else ' ' + units[num % 10])
        else:
            return units[num // 100] + ' Hundred' + ('' if num % 100 == 0 else ' and ' + _convert_below_1000(num % 100))
    
    if n == 0:
        return "Zero"
    elif n < 1000:
        return _convert_below_1000(n)
    elif n < 1000000:
        return _convert_below_1000(n // 1000) + ' Thousand' + ('' if n % 1000 == 0 else ' ' + _convert_below_1000(n % 1000))
    else:
        return str(n)  # For simplicity, large numbers will return as a string
