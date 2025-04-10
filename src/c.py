def has_no_repeated_digits(number):
    digits = str(number)
    return len(digits) == len(set(digits))

def contains_target_digits(number, target_digits):
    return any(d in str(number) for d in target_digits)

def main():
    count = 0
    target_digits = {'2', '3', '4', '5'}
    valid_numbers = []

    for num in range(500, 1000):  # inclusive of 999
        if has_no_repeated_digits(num) and contains_target_digits(num, target_digits):
            count += 1
            valid_numbers.append(num)

    print(f"Count of valid numbers: {count}")
    print("Some valid numbers:", valid_numbers[:10], "...")  # print a sample

main()