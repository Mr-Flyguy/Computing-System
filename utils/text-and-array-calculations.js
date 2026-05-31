export function isPalindrom(value) {
    const normalized = String(value)
        .toLowerCase()
        .replace(/[^a-zа-я0-9]/gi, "");

    const reversed = normalized.split("").reverse().join("");
    return normalized === reversed;
}

export function sumOfUniqueElements(numbers_value) {
    const values = Array.isArray(numbers_value)
        ? numbers_value.map((item) => Number(item))
        : String(numbers_value)
            .split(",")
            .map((item) => Number(item.trim()));

    const counts = new Map();

    for (const value of values) {
        if (Number.isNaN(value)) {
            continue;
        }

        counts.set(value, (counts.get(value) || 0) + 1);
    }

    let sum = 0;

    for (const [value, count] of counts.entries()) {
        if (count === 1) {
            sum += value;
        }
    }

    return sum;
}
