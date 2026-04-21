export function parseNumbers(numbers_value) {
    if (Array.isArray(numbers_value)) {
        return numbers_value
            .map((item) => Number(item))
            .filter((item) => !Number.isNaN(item));
    }

    if (typeof numbers_value !== "string") {
        return [];
    }

    return numbers_value
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((item) => !Number.isNaN(item));
}

export function sumOfSquares(numbers_value) {
    const arr = parseNumbers(numbers_value);
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }

    return sum;
}

export function factorial(n) {
    if (n < 0) {
        return null;
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

export function gcd(a, b) {
    let left = Math.abs(a);
    let right = Math.abs(b);

    while (right !== 0) {
        const remainder = left % right;
        left = right;
        right = remainder;
    }

    return left;
}

export function solveExpression(expression, x) {
    const str = expression.replace(/x/g, x);
    let i = 0;

    function parse() {
        let result = 0;
        let current = 0;
        let sign = 1;

        while (i < str.length) {
            const char = str[i];

            if (char >= "0" && char <= "9") {
                current = 0;

                while (i < str.length && str[i] >= "0" && str[i] <= "9") {
                    current = current * 10 + Number(str[i]);
                    i++;
                }

                i--;
            } else if (char === "(") {
                i++;
                current = parse();
            } else if (char === ")") {
                result += sign * current;
                return result;
            }

            if (i + 1 < str.length && str[i + 1] === "*") {
                i += 2;
                let next = 0;

                if (str[i] === "(") {
                    i++;
                    next = parse();
                } else {
                    while (i < str.length && str[i] >= "0" && str[i] <= "9") {
                        next = next * 10 + Number(str[i]);
                        i++;
                    }
                    i--;
                }

                current = current * next;
            }

            if (char === "+" || char === "-") {
                result += sign * current;
                current = 0;
                sign = char === "+" ? 1 : -1;
            }

            i++;
        }

        result += sign * current;
        return result;
    }

    return parse();
}
